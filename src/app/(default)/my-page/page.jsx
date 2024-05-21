"use client";

import { useState, useEffect } from "react";
import styles from "./my-page.module.css";
import { Admin } from "../../../page-src/my-page/admin/admin";
import { DlownloadList } from "../../../page-src/my-page/download-list/dlownload-list";
import { ScrapList } from "../../../page-src/my-page/scrap-list/scrap-list";
import "../../../page-src/my-page/my-page.css";
import { QnA } from "../../../page-src/my-page/qna/qna";

export default function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState("계정 관리");

  useEffect(() => {
    setSelectedMenu("계정 관리");
  }, []);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <div className={`noLayoutPadding ${styles.container}`}>
        {/* 마이페이지 메뉴 목록 (내 정보 관리, 데이터 관리, 문의) */}
        <div className={styles.listWrapper}>
          <div className={styles.list}>
            <ol>
              {/* 마이페이지 메뉴 1 : 내 정보 관리 */}
              <li className={styles.detailList}>
                <h3>내 정보 관리</h3>
                <ol>
                  <li onClick={() => handleMenuClick("계정 관리")}>계정 관리</li>
                </ol>
              </li>

              {/* 마이페이지 메뉴 2 : 데이터 관리 */}
              <li className={styles.detailList}>
                <h3>데이터 관리</h3>
                <ol>
                  <li onClick={() => handleMenuClick("데이터 다운로드 목록")}>
                    데이터 다운로드 목록
                  </li>
                  <li onClick={() => handleMenuClick("데이터 관심 목록")}>
                    데이터 관심 목록
                  </li>
                  <li onClick={() => handleMenuClick("데이터 요청 목록")}>
                    데이터 요청 목록
                  </li>
                </ol>
              </li>

              {/* 마이페이지 메뉴 3 : 문의 */}
              <li className={styles.detailList}>
                <h3>문의</h3>
                <ol>
                  <li onClick={() => handleMenuClick("Q&A")}>Q&A</li>
                </ol>
              </li>
            </ol>
          </div>
        </div>

        <div className={styles.mainWrapper}>
          <div className={styles.mainHeader}>{selectedMenu}</div>
          {/* 각 메뉴에 따른 섹션 조건부 렌더링 */}

          {/* 계정 관리에 해당하는 섹션 */}
          {selectedMenu === "계정 관리" && <Admin />}

          {/* 데이터 다운로드 목록에 해당하는 섹션 */}
          {selectedMenu === "데이터 다운로드 목록" && <DlownloadList />}

          {/* 데이터 관심 목록에 해당하는 섹션 */}
          {selectedMenu === "데이터 관심 목록" && <ScrapList />}

          {/* Q&A에 해당하는 섹션 */}
          {selectedMenu === "Q&A" && <QnA />}
        </div>
      </div>
    </>
  );
}
