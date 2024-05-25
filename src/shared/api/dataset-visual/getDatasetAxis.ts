import { DATASET_API } from "../config";
import { DatasetAxisResponse } from "./type";

export async function getDatasetAxis(datasetId: number) {
  try {
    const response: DatasetAxisResponse = await fetch(
      `${DATASET_API}/${datasetId}/axis`,
    ).then((res) => res.json());

    if (!response.success) {
      console.error(response.msg);
      return null;
    }

    return response.result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
