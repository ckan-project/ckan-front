import { SERVER_API } from "../config";
import { QuestionDetailResponse } from "./type";

export async function getQuestion(questionId: number) {
  try {
    const response: QuestionDetailResponse = await fetch(
      `${SERVER_API}/api/question/${questionId}`,
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
