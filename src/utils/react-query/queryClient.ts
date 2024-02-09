/**
 * @fileoverview React-Query에서 사용하는 QueryClient 인스턴스
 *
 * queryClient를 리액트 컴포넌트 밖에서 사용할 경우, useQueryClient 훅을 사용할 수 없고,
 * 그렇다고 main.tsx 파일에 queryClient 인스턴스를 생성하여 export하는 것은 파일의 용도 상 부적절한 것 같아 외부 파일에서 관리했습니다.
 */

import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default queryClient;
