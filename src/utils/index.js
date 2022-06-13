import { message } from "antd";
const uploadProps = {
  name: "icon",
  beforeUpload: (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    return isJpgOrPng;
  },
  onChange(info) {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  customRequest: ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  },
  maxCount: 1,
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

export { uploadProps, normFile };
