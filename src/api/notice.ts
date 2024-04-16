import { NOTICE_SORT_TYPES } from "../constants";
import { GeneralResponse, SERVER_API } from "./config";

type NoticeParam = {
  sort: NOTICE_SORT_TYPES | undefined;
  page: number | undefined;
};

export type Notice = {
  noticeId: number;
  title: string;
  createDate: string;
  view: number;
  adminName: string;
};

export type NoticeResult = {
  totalPage: number;
  totalElement: number;
  data: Notice[];
};

interface NoticesResponse extends GeneralResponse {
  result: NoticeResult;
}

export async function getNotices(filter: NoticeParam): Promise<NoticeResult> {
  try {
    const params = new URLSearchParams();

    params.append("page", filter.page ? `${filter.page}` : "0");
    params.append("sort", filter.sort ? filter.sort : "최신순");

    console.log("request uri >>>", `${SERVER_API}/api/notices?${params.toString()}`);

    const response: NoticesResponse = await fetch(
      `${SERVER_API}/api/notices?${params.toString()}`,
    ).then((res) => res.json());

    if (!response.success) {
      console.error(response.msg);
      return null;
    }

    console.log("notice response >>>", response);

    return response.result;
  } catch (e) {
    console.error(e);
    return null;
  }
}