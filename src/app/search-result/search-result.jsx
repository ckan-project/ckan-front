"use client";

import React, { useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterCheckButton, SearchSortDropdown } from "../../components";
import styles from "./searchResult.module.css";
import Image from "next/image";
import { NextButton, PreviousButton, ResetIcon } from "../../../public/svgs";
import { StickHorizonSmall } from "../../../public/svgs";
import { Dataset } from "../../api/search-result";
import Link from "next/link";

const THEME_VALUES = ["입학", "취업"];
const ORGANIZATION_VALUES = [
  "경영대학",
  "국문대학",
  "예체능대학",
  "디자인대학",
  "공과대학",
  "소프트웨어융합대학",
  "경상대학",
  "학술정보관",
  "커리어개발센터",
  "학생지원팀",
  "총무인사처",
  "관재팀",
];
const DATA_TYPES = ["SHEET", "CHART", "FILE", "MAP", "LINK", "LOD"];

/**
 *
 * @param {{
 *    keyword: string | null;
 *    results: Dataset[];
 *    totalPage: number;
 *    initPage: number;
 * }}
 * @returns
 */
export default function SearchResult({
  results,
  totalElement,
  totalPage,
  initPage,
}) {
  // ? 페이지 값 없이 렌더링하는 경우 -> 1페이지를 기본 페이지로 설정
  const _initPage = initPage ? initPage : "1";

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const keyword = searchParams.get("keyword");

  const [selectedFilter, setSelectedFilter] = useState("");

  /**
   * 쿼리 파라미터를 수정할 때 수정하는 함수
   * @returns {string}
   */
  const updateQueryString = useCallback(
    /**
     *
     * @param {"create" | "append" | "remove"} type - 수정할 작업
     * @param {string} name - 수정할 파라미터의 이름
     * @param {any} value - 수정할 파라미터의 값
     * @returns
     */
    (type, name, value) => {
      const params = new URLSearchParams(searchParams.toString());

      switch (type) {
        case "create":
          params.set(name, value);
          return params.toString();

        case "append":
          params.append(name, value);
          return params.toString();

        case "remove":
          params.delete(name, value);
          return params.toString();

        default:
          return "";
      }
    },
    [searchParams],
  );

  /**
   * 필터 버튼 클릭시 실행되는 함수
   */
  const handleFilterClick = useCallback(
    (queryName, value) => {
      if (!Array.from(searchParams.values()).includes(value)) {
        router.push(`${pathName}?${updateQueryString("append", queryName, value)}`);
        return;
      }

      router.push(`${pathName}?${updateQueryString("remove", queryName, value)}`);
    },
    [searchParams, updateQueryString],
  );

  /**
   * 초기화 버튼 클릭시 실행되는 함수
   */
  const handleResetClick = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("theme");
    params.delete("organization");

    router.push(`${pathName}?${params.toString()}`);
  }, [searchParams]);

  return (
    <>
      {/* //* navigate info box */}
      <div className={styles.navigateInfoContainer}>
        <p>Home {" > "} 데이터 찾기</p>
      </div>

      {/* //* 검색창 */}
      {/* //TODO */}

      {/* //* 검색어 안내 문구 */}
      {keyword ? (
        <h1 className={styles.keywordTitle}>
          <span>' {keyword} '</span> 에 대한 {totalElement.toLocaleString()}개의 검색
          결과
        </h1>
      ) : (
        <h1 className={styles.keywordTitle}>
          {totalElement.toLocaleString()}개의 데이터 열람 가능
        </h1>
      )}

      {/* //* 검색 필터 & 검색 결과 리스트 표출 영역 */}
      <main className={styles.mainContainer}>
        {/* //? 데이터 유형별 필터 */}
        <section>
          <div className={styles.sectionTitleWrapper}>
            <h2 className={styles.sectionTitle}>필터</h2>
            <div className={styles.resetTextContainer} onClick={handleResetClick}>
              <Image src={ResetIcon} alt="초기화 버튼 이미지" />
              <p className={styles.resetText}>초기화</p>
            </div>
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} />

          {/* //? 주제별 */}
          <div className={styles.filterTitleWrapper}>
            <h2 className={styles.sectionSubtitle}>주제별</h2>
            <Image src={StickHorizonSmall} alt="-" />
          </div>

          <div>
            {THEME_VALUES.map((value) => (
              <FilterCheckButton
                isSelected={Array.from(searchParams.values()).includes(value)}
                text={value}
                value={value}
                handleClick={() => handleFilterClick("theme", value)}
              />
            ))}
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} />

          {/* //? 조직별 */}
          <div className={styles.filterTitleWrapper}>
            <h2 className={styles.sectionSubtitle}>조직별</h2>
            <Image src={StickHorizonSmall} alt="-" />
          </div>

          <div>
            {ORGANIZATION_VALUES.map((value) => (
              <FilterCheckButton
                isSelected={Array.from(searchParams.values()).includes(value)}
                text={value}
                value={value}
                handleClick={() => handleFilterClick("organization", value)}
              />
            ))}
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} />
        </section>

        {/* //? 검색 결과 리스트 */}
        <section>
          <div className={styles.sectionTitleWrapper}>
            {/* //* 검색 결과 개수 */}
            <h2 className={styles.sectionTitle}>
              전체{" "}
              <span className={styles.highlightText}>
                {totalElement.toLocaleString()}
              </span>
              건
            </h2>

            {/* //* 검색 필터 */}
            <div className={styles.rowWrapper}>
              <SearchSortDropdown
                selectedItem={selectedFilter}
                setSelectedItem={setSelectedFilter}
              />
              <SearchSortDropdown style={{ marginLeft: "0.25rem" }} />
            </div>
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} />

          {/* //* 검색 결과 리스트 */}
          {/* //TODO: 실제 데이터 정보에 맞게 변경 */}
          {results.map((dataset) => (
            <div key={dataset.datasetId}>
              <h1>{dataset.title}</h1>
              <p>{dataset.description}</p>
              <h5>조회수: {dataset.view}</h5>
            </div>
          ))}

          {/* //* 페이지 리스트 */}
          <div
            className={styles.pagesContainer}
            style={{
              margin: "0.75rem 0 2.25rem 0",
            }}
          >
            <div className={styles.pagesWrapper}>
              {/* //? 이전 페이지 버튼 */}
              <Link
                href={`${pathName}?${updateQueryString(
                  "create",
                  "page",
                  Math.max(1, parseInt(_initPage) - 1),
                )}`}
              >
                <Image src={PreviousButton} alt="이전 페이지 버튼" />
              </Link>

              {/* //? 페이지 버튼 목록 */}
              {new Array(totalPage).fill(0).map((_, index) => (
                <Link
                  href={`${pathName}?${updateQueryString(
                    "create",
                    "page",
                    index + 1,
                  )}`}
                  key={index}
                  className={styles.pageButton}
                  style={
                    _initPage == index + 1
                      ? {
                          backgroundColor: "#767676",
                          color: "white",
                        }
                      : {}
                  }
                >
                  {index + 1}
                </Link>
              ))}

              {/* //? 다음 페이지 버튼 */}
              <Link
                href={`${pathName}?${updateQueryString(
                  "create",
                  "page",
                  Math.min(totalPage, parseInt(_initPage) + 1),
                )}`}
              >
                <Image src={NextButton} alt="다음 페이지 버튼" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
