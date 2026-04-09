#!/bin/sh

# Inspired by https://github.com/bennofs/nix-index/blob/master/command-not-found.sh
# and https://github.com/Shopify/comma but tailored for Replit.

REPLIT_NIX="${REPL_HOME}/replit.nix"
DOT_REPLIT="${REPL_HOME}/.replit"
MODULES_STAMP="${REPL_HOME}/.cache/replit/modules.stamp"
BASHRC="${REPL_HOME}/.config/bashrc"
SHELL_ENV="/run/replit/env/latest"
SHELL_ENV_ERROR="/run/replit/env/error"
# timestamp format: nanoseconds since epoch
TS_FMT="+%s%N"
# the timestamp of SHELL_ENV that is currently loaded in the environment, or
# that of SHELL_ENV_ERROR, if it exists
ACTIVE_TS=0
if [[ -f "${SHELL_ENV}" ]]; then
  ACTIVE_TS="$(/nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/date -r "${SHELL_ENV}" "${TS_FMT}" 2>/dev/null || echo 0)"
fi

if [[ -n "${VSCODE_SHELL_INTEGRATION}" ]]; then
   # Default VSCode/Cursor fonts do not include the Georgian paragraph separator
  __REPLIT_LOGO=''
elif [[ -n "${SSH_TTY}" ]]; then
  __REPLIT_LOGO=$'\u10FB'  # Georgian paragraph separator
else
  __REPLIT_LOGO=$'\uEEA7'  # Custom codepoint for our logo
fi

if [[ -n "${REPLIT_USER_RUN:-}" ]] && [[ "${HISTFILE:-}" == "${HOME}/.bash_history" ]]
then
  /nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/mkdir -p "${REPLIT_USER_RUN}"
  HISTFILE="${REPLIT_USER_RUN}/.bash_history"
  HISTCONTROL="${HISTCONTROL:-ignoredups}"
  HISTFILESIZE="${HISTFILESIZE:-100000}"
  HISTSIZE="${HISTSIZE:-10000}"
fi

# Make sure that we reload the shell environment every time it changes.
# This function should be all bash builtins in the hot path to avoid slowing
# things down unnecessarily.
prompt_command() {
    history -a
    if [[ -f "${SHELL_ENV}" ]] && [[ "${ACTIVE_TS}" -lt "$(/nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/date -r "${SHELL_ENV}" "${TS_FMT}" 2>/dev/null || echo 0)" ]]; then
        update_environment
    fi
}
PROMPT_COMMAND=prompt_command

# CC BY-SA licensed
yes_or_no() {
    while true; do
        printf "\e[33m$* [y/n] %s \e[0m" "${__REPLIT_LOGO}"
        read -rp "" yn
        case $yn in
            [Yy]*) return 0  ;;
            [Nn]*) echo "Aborted" ; return  1 ;;
        esac
    done
}

maybe_install_nix_module() {
    TOOL_NAME="$1"
    MODULE_ID="$2"

    yes_or_no "Install Replit's ${TOOL_NAME} tools" || return 1

    result="$(/nix/store/vqapsnihn8flnsc1z7392b7m7f64g85n-curl-8.14.1-bin/bin/curl --silent --header "Content-Type: application/json" \
                  --request POST \
                  --data "{\"ids\":[\"${MODULE_ID}\"]}" \
                  localhost:8283/nixmodule/add)"
    if [[ "${result}" != '{"status":"ok"}' ]]; then
        echo -e "\e[0;33m${__REPLIT_LOGO} Failed to add tools, check whether your .replit file is properly formatted.\e[0m" >&2
        return 1
    fi
}

# waits until env_has_pending_build returns exit code 0. Shows user an animation while they wait.
wait_till_env_up_to_date() {
    if env_has_pending_build; then
        echo -ne "\e[33m${__REPLIT_LOGO} Waiting for environment to update."
        /nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/sleep 1
        while env_has_pending_build; do
            echo -n "."
            /nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/sleep 1
        done
        echo -ne "\e[0m\r"
    fi
}

# returns an exit code representing whether the SHELL_ENV file or SHELL_ENV_ERROR, if present,
# is up-to-date wrt the 3 build input files: DOT_REPLIT, REPLIT_NIX, and MODULES_STAMP.
# exit code 0 means yes, otherwise no
env_has_pending_build() {
    if [[ "${REPLIT_NIX}" -nt "${SHELL_ENV}" ]] || [[ "${DOT_REPLIT}" -nt "${SHELL_ENV}" ]] || [[ "${MODULES_STAMP}" -nt "${SHELL_ENV}" ]]; then
        if [[ -f "${SHELL_ENV_ERROR}" ]]; then
            if [[ "${REPLIT_NIX}" -nt "${SHELL_ENV_ERROR}" ]] || [[ "${DOT_REPLIT}" -nt "${SHELL_ENV_ERROR}" ]] || [[ "${MODULES_STAMP}" -nt "${SHELL_ENV_ERROR}" ]]; then
                return 0
            else
                return 1
            fi
        else
            return 0
        fi
    else
        return 1
    fi
}

# notifies of an error if ACTIVE_TS is different from SHELL_ENV's last modified timestamp
maybe_notify_error() {
    if [[ -f "${SHELL_ENV_ERROR}" && "${ACTIVE_TS}" -lt "$(/nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/date -r "${SHELL_ENV_ERROR}" "${TS_FMT}" 2>/dev/null || echo 0)" ]]; then
        # As long as there are new syntax / build errors, notify the user about
        # them.  Ideally in the future we display this somewhere else if the user
        # is interacting with the Repl through the Workspace (but still show this
        # if the session happens through SSH).
        echo -e "\e[0;33m${__REPLIT_LOGO} Failed to compile new environment.\e[0m" >&2
        echo -e "\e[0;33m${__REPLIT_LOGO} Run \`cat ${SHELL_ENV_ERROR}\` to display the error.\e[0m" >&2
        ACTIVE_TS="$(/nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/date -r "${SHELL_ENV_ERROR}" "${TS_FMT}" 2>/dev/null || echo 0)"
    fi
}

# loads the updated environment and updates ACTIVE_TS
update_environment() {
    ACTIVE_TS="$(/nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/date -r "${SHELL_ENV}" "${TS_FMT}")"
    source "${SHELL_ENV}" || exit
}

# aliases copied from the Ubuntu container's ~/.bashrc which impact color.
# We want colors even when using agent or workflow modes, but the additional
# creature comfort commands are set down below.
eval "$(/nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/dircolors -b)"
# Emperically, --color=auto also enables columnar alignment.
# Without this, columns are inconsistent and output wraps incorrectly.
alias ls='ls --color=auto'
alias grep='/nix/store/l2wvwyg680h0v2la18hz3yiznxy2naqw-gnugrep-3.11/bin/grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'

# TODO: Devon, James, Luis: Once workflows are properly interactive, we can
# limit this to only REPLIT_MODE=agent.
if [[ "${REPLIT_MODE}" = agent ]] || [[ "${REPLIT_MODE}" = workflow ]]; then
  # We only get one opportunity to run this, let's do it here.
  if [[ "${REPLIT_MODE}" = workflow ]]; then
    wait_till_env_up_to_date
  else
    # Pull the looping logic out of wait_till_env_up_to_date to avoid
    # blowing tokens on progress bars.
    while env_has_pending_build; do
        /nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/sleep 1
    done
  fi

  # If we got a build error, display it here. The agent may be able to figure it out.
  maybe_notify_error
  # If we were building, this will now update the environment
  if [[ -f "${SHELL_ENV}" ]] && [[ "${ACTIVE_TS}" -lt "$(/nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/date -r "${SHELL_ENV}" "${TS_FMT}" 2>/dev/null || echo 0)" ]]; then
      echo -e "\e[0;33m${__REPLIT_LOGO} Environment updated. Reloading shell...\e[0m" >&2
      update_environment
  fi
  # bash -rcfile .../bashrc uses "source" semantics, which means we can return from a top-level script
  return
fi

command_not_found_handle() {
    # We can only do the Nix magic when in a Nix repl.
    if ! [[ -t 0 ]] || [[ $- != *i* ]]; then  # If stdin is not a tty or we aren't in an interactive shell
        >&2 echo "bash: $1: command not found"
        return 127
    fi

    # taken from http://www.linuxjournal.com/content/bash-command-not-found
    # - do not run when inside Midnight Commander or within a Pipe
    if [[ -n "${MC_SID-}" ]] || ! [[ -t 1 ]]; then
        >&2 echo "bash: $1: command not found"
        return 127
    fi

    wait_till_env_up_to_date
    maybe_notify_error
    if [[ -f "${SHELL_ENV}" ]] && [[ "${ACTIVE_TS}" -lt "$(/nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/date -r "${SHELL_ENV}" "${TS_FMT}" 2>/dev/null || echo 0)" ]]; then
        update_environment
        # retry the command:
        "$@"
        return $?
    fi

    cmd="$1"

    nixmodule_installed=
    if [[ "$cmd" == @(python|poetry|pip)* ]]; then
        if /nix/store/l2wvwyg680h0v2la18hz3yiznxy2naqw-gnugrep-3.11/bin/grep --silent 'python-3\.\(8\|10\|11\|12\):' "${REPL_HOME}/.replit" 2>/dev/null; then
          >&2 echo "bash: $1: command not found"
          return 127
        fi
        maybe_install_nix_module "Python" "python-3.11"
        nixmodule_installed="$?"
    elif [[ "$cmd" == @(node|npm|npx|pnpm|pnpx|yarn)* ]]; then
        if /nix/store/l2wvwyg680h0v2la18hz3yiznxy2naqw-gnugrep-3.11/bin/grep --silent  '(nodejs|bun)-[0-9]*(\.[0-9])?:' "${REPL_HOME}/.replit" 2>/dev/null; then
          >&2 echo "bash: $1: command not found"
          return 127
        fi
        maybe_install_nix_module "Node" "nodejs-20"
        nixmodule_installed="$?"
    elif [[ "$cmd" == @(bun|bunx)* ]]; then
        if /nix/store/l2wvwyg680h0v2la18hz3yiznxy2naqw-gnugrep-3.11/bin/grep --silent  '(nodejs|bun)-[0-9]*(\.[0-9])?:' "${REPL_HOME}/.replit" 2>/dev/null; then
          >&2 echo "bash: $1: command not found"
          return 127
        fi
        maybe_install_nix_module "Bun" "bun-1.1"
        nixmodule_installed="$?"
    fi

    if [[ -n "${nixmodule_installed}" ]] && [[ "${nixmodule_installed}" -eq 0 ]]; then
        (
          wait_till_env_up_to_date && source "$SHELL_ENV"
          rc="$?"
          if [[ "${rc}" -eq 0 ]]; then
            if /nix/store/s0pv1byj75arx8wfmw659y11dy4a41hy-which-2.23/bin/which "$1" &>/dev/null; then
              "$@"
            else
              >&2 echo "bash: ${cmd}: command not found"
              exit 127
            fi
          else
            exit "$rc"
          fi
        )
        return "$?"
    fi

    toplevel=nixpkgs
    mapfile -t choices < <(
        /nix/store/8mqmbb05zg3b5x7yb3bwxfcq5klgzb6i-replit-nix-locate/bin/nix-locate --minimal --at-root --whole-name "/bin/${cmd}" \
        | /nix/store/md2z14bhvqk8nvylad6fiifcd19vhlqz-jq-1.7.1-bin/bin/jq -Rr '
            . as $fullAttr
            | $fullAttr[:$fullAttr | rindex(".")]
            | select([.] | inside(["busybox", "toybox"]) | not)
          ' \
        | /nix/store/392hs9nhm6wfw4imjllbvb1wil1n39qx-findutils-4.10.0/bin/xargs -n 1 /nix/store/8vw1zfdbclvr0xyqdw9qy2k2q3vws1vh-replit-rippkgs/bin/rippkgs --json --exact 2>/dev/null \
        | /nix/store/md2z14bhvqk8nvylad6fiifcd19vhlqz-jq-1.7.1-bin/bin/jq -r '
            map([.attribute, .version, .description])[]
            | @tsv
          ' \
        | /nix/store/smvpwhzmx1qc21yxc798drwfpsb7ng34-util-linux-2.41.1-bin/bin/column -ts $'\t'
    )

    case "${#choices[@]}" in
        0)
            >&2 echo "bash: ${cmd}: command not found"
            return 127
            ;;

        1)
            >&2 /nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/cat <<EOF
${cmd}: command not installed, but was located via Nix.
package: ${choices[0]}
EOF
            case "$(read -r -p "Would you like to run ${cmd} from Nix and add it to your project? [Yn]: " </dev/tty && echo "${REPLY}")" in
                "y"|"Y"|"")
                    selection="${choices[0]}"
                    ;;
                *) return 127;;
            esac
            ;;

        *)

            >&2 /nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/cat <<EOF
${cmd}: command not installed. Multiple versions of this command were found in Nix.
Select one to run (or press Ctrl-C to cancel):
EOF
            selection="$(printf '%s\n' "${choices[@]}" | /nix/store/v36cz7cy3p001pyspjfsgawqx7ln73ms-fzy-1.0/bin/fzy)"
            if [[ "$?" -ne 0 ]]; then
                return 127
            fi
            ;;
    esac

    # print the selection to make it clear to the user what was selected
    echo "$selection"

    attr="$(echo "$selection" | /nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/cut -d ' ' -f 1)"
    output="$(/nix/store/8mqmbb05zg3b5x7yb3bwxfcq5klgzb6i-replit-nix-locate/bin/nix-locate --minimal --at-root --whole-name "/bin/${cmd}" | grep "^${attr}\." | awk -F '.' '{print $NF}')"
    binpath="/nix/store/$(/nix/store/8vw1zfdbclvr0xyqdw9qy2k2q3vws1vh-replit-rippkgs/bin/rippkgs --json --exact "${attr}" | /nix/store/md2z14bhvqk8nvylad6fiifcd19vhlqz-jq-1.7.1-bin/bin/jq -r ".[0].store_paths.${output}")/bin/${cmd}"

    [[ -f "${binpath}" ]] || nix-build --no-out-link -A "$attr" "<$toplevel>"
    if [[ "$?" -eq 0 ]]; then
        if [[ ! -f "${REPLIT_NIX}" ]]; then
            >&2 echo "Adding ${attr} to .replit"
            pkgs="$(echo '[{"op":"get","path":"nix/packages"}]' | /nix/store/hw9qxplkf7q92cz8fmpi98i0qp5f7wpi-toml-editor-0.0.0-7452ace/bin/toml-editor --path "${DOT_REPLIT}" 2>/dev/null | /nix/store/md2z14bhvqk8nvylad6fiifcd19vhlqz-jq-1.7.1-bin/bin/jq -c '.results[]')"
            if [[ "$pkgs" == "null" ]]; then
                pkgs="[]"
            fi
            if ! echo "$pkgs" | /nix/store/md2z14bhvqk8nvylad6fiifcd19vhlqz-jq-1.7.1-bin/bin/jq -e --arg attr "$attr" 'index($attr) != null' &>/dev/null; then
                pkgs="$(echo "$pkgs" | /nix/store/md2z14bhvqk8nvylad6fiifcd19vhlqz-jq-1.7.1-bin/bin/jq -c --arg attr "$attr" '. + [$attr]')"
            fi
            echo '[{"op":"add","path":"nix/packages","value":"'"$(echo "$pkgs" | /nix/store/4rpiqv9yr2pw5094v4wc33ijkqjpm9sa-gnused-4.9/bin/sed 's/"/\\"/g')"'"}]' | /nix/store/hw9qxplkf7q92cz8fmpi98i0qp5f7wpi-toml-editor-0.0.0-7452ace/bin/toml-editor --path "${DOT_REPLIT}" &>/dev/null
        else
            >&2 echo "Adding ${attr} to replit.nix"
            /nix/store/xw6d3ms54zgg42v6j9s00lh1kxzgksyl-nix-editor-0.0.0-9472fbd/bin/nix-editor --add "pkgs.${attr}" --human --path "${REPLIT_NIX}"
        fi
        if [[ -f "${binpath}" ]]; then
            shift 1
            "${binpath}" "${@}"
        else
            # Quote escape args before passing to nix-shell:
            # The space in '%q ' is important to avoid slamming all the args
            # together in the subshell
            nix-shell -p "$attr" --run "$(printf '%q ' "$@")"
        fi
        return $?
    else
        >&2 /nix/store/rry6qingvsrqmc7ll7jgaqpybcbdgf5v-coreutils-9.7/bin/cat <<EOF
Failed to install ${toplevel}.${attr}.
$cmd: command not found
EOF
        return 127
    fi
}

if [[ -f "${BASHRC}" ]] && [[ -z "${REPLIT_MODE}" ]]; then
    # If the user has a bashrc, load it up (unless we have REPLIT_MODE set,
    # which is used for special occasions like agent/assistant/workflow use).
    #
    # They can set their environment there and be happy.
    source "${BASHRC}"
fi


# We use FinalTerm shell integration commands to send in-band messages to the workspace
_ftcs_prompt() {
    printf "\e]133;A\a"
}

_ftcs_command_start() {
    printf "\e]133;B\a"
}

_ftcs_command_executed() {
    printf "\e]133;C\a"
}

_ftcs_command_finished() {
    printf "\e]133;D;\$?\a"
}

# 82 is 'R' for [R]eplit
_replit_command_tracking() {
    printf "\e]82;A;%s\a" "$1"
}

_replit_pwd_tracking() {
    printf "\e]82;B;%s\a" "$(pwd)"
}

_replit_update_prompt() {
    if [[ "${_custom_prompt}" == "" || "${_custom_prompt}" != "${PS1}" ]]; then
        _original_prompt="${PS1}"
        _custom_prompt="\[$(_ftcs_command_finished)\]\[$(_ftcs_prompt)\]${_original_prompt}\[$(_ftcs_command_start)\]"
        PS1="${_custom_prompt}"
    fi
}

_replit_update_prompt

# If we have bash-preexec, track user commands in the shell using a precmd()
# hook and replspace API request.
source "/nix/store/470qrkjzbqm98d8rcnqsl1jmnm38a2vj-source/bash-preexec.sh"

preexec() {
    escaped="$(echo "$1" | /nix/store/4rpiqv9yr2pw5094v4wc33ijkqjpm9sa-gnused-4.9/bin/sed 's/"/\\"/g')"

    # Shell tracking in PID2 is done through in-band messages
    _replit_command_tracking "${escaped}"
    _replit_pwd_tracking

    _ftcs_command_executed
}

precmd() {
    _replit_pwd_tracking
}

if [[ -f "/nix/store/rdv67mff1y8i47bx85mdxw86fjmzq1sf-bash-completion-2.16.0/share/bash-completion/bash_completion" ]]; then
  source "/nix/store/rdv67mff1y8i47bx85mdxw86fjmzq1sf-bash-completion-2.16.0/share/bash-completion/bash_completion"
fi

# Common aliases for ls copied from the Ubuntu container's ~/.bashrc
# Aliases that define colors are defined above, so the agent and workflows can also benefit.
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
