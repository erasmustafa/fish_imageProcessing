import { getModelTrainingStatus } from "../../../lib/server/model-training-status";
import ModelStatusClient from "./model-status-client";

export default function ModelStatusWorkspace() {
  const status = getModelTrainingStatus();
  return <ModelStatusClient status={status} />;
}
