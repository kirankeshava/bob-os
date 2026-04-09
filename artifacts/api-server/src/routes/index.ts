import { Router, type IRouter } from "express";
import healthRouter from "./health";
import businessesRouter from "./businesses";
import tasksRouter from "./tasks";
import commentsRouter from "./comments";
import dashboardRouter from "./dashboard";
import agentsRouter from "./agents";
import artifactsRouter from "./artifacts";
import sitesRouter from "./sites";
import emailRouter from "./email";
import syncRouter from "./sync";
import signupRouter from "./signup";
import skillsRouter from "./skills";
import customersRouter from "./customers";
import ceoReviewsRouter from "./ceo-reviews";
import knowledgeBaseRouter from "./knowledge-base";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/businesses", businessesRouter);
router.use("/businesses/:businessId/artifacts", artifactsRouter);
router.use("/businesses/:businessId/site", sitesRouter);
router.use("/businesses/:businessId/inbox", emailRouter);
router.use("/businesses/:businessId/ceo-review", ceoReviewsRouter);
router.use("/businesses/:businessId/knowledge-base", knowledgeBaseRouter);
router.use("/", tasksRouter);
router.use("/", commentsRouter);
router.use("/dashboard", dashboardRouter);
router.use("/agent", agentsRouter);
router.use("/sync", syncRouter);
router.use("/businesses/:businessId/signup", signupRouter);
router.use("/skills", skillsRouter);
router.use("/customers", customersRouter);

export default router;
