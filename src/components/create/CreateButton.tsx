import styled from "@emotion/styled";
import PlusSquaredIcon from "../icons/PlusSquared";
import createImageCache from "./createImageCache";
import { useNavigate } from "react-router";

export default function CreateButton() {
  const navigate = useNavigate();
  return (
    <>
      <Button htmlFor="createButtonFileInput">
        <PlusSquaredIcon />
      </Button>
      <FileInput
        id="createButtonFileInput"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            createImageCache.set(file);
            navigate("/challenge/create");
          }
        }}
      />
    </>
  );
}

const Button = styled.label`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;

const FileInput = styled.input`
  display: none;
`;
