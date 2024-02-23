import React from "react";

type Props = {
  apiEndpoint: "agencyLogo" | "avatar" | "subAccountLogo";
  onChange: (url?: string) => void;
  value?: string;
};

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  const type = value?.split(".").pop();

  return <div>FileUpload</div>;
};

export default FileUpload;
