interface Dataset {
  x_axis_name: string;
  x_label: string[];
  dataName: string[];
  dataList: Array<Array<string>>;
}

export const dataset: Dataset = {
  x_axis_name: "공시연도",
  x_label: ["2019", "2020", "2021", "2022", "2023"],
  dataName: [
    "총 강의담당 학점",
    "전임교원",
    "비전임교원 겸임교원",
    "비전임교원 초빙교원",
    "비전임교원 강사",
    "비전임교원 시간강사",
    "비전임교원 기타비전임",
  ],
  dataList: [
    ["9669", "9762", "10312", "10659", "11094"],
    ["5718", "5710", "5853", "6039", "6426"],
    ["1720", "1759", "1904", "1946", "1893"],
    ["244", "375", "366", "178", "256"],
    ["151", "710", "1033", "1652", "1773"],
    ["716.4", "434.4", "366.5", "0", "0"],
    ["1119", "774", "790", "845", "746"],
  ],
};