import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// Ngày bắt đầu và kết thúc
const startDate = moment("2024-06-24");
const endDate = moment("2025-06-19");

const generateCommits = async () => {
  let date = startDate.clone();

  while (date.isSameOrBefore(endDate)) {
    // Random số lần commit trong ngày (tùy bạn chọn nhiều hay ít)
    const commitsPerDay = random.int(1, 8); // từ 1 đến 8 commit mỗi ngày

    for (let i = 0; i < commitsPerDay; i++) {
      const commitDate = date.clone().add(i, "h").format(); // commit cách nhau vài giờ
      const data = { date: commitDate };

      // Ghi file tạm
      await jsonfile.writeFile(path, data);

      // Commit với ngày giả lập
      await git.add([path]).commit(`commit on ${commitDate}`, {
        "--date": commitDate,
      });

      console.log(`✅ Commit: ${commitDate}`);
    }

    date.add(1, "day");
  }

  // Đẩy lên GitHub sau khi xong
  await git.push("origin", "main"); // chỉnh "main" nếu nhánh khác
};

generateCommits();
