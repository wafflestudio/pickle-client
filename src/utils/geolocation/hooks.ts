import { useEffect, useState } from "react";

enum GeolocationErrorCode {
  NOT_SUPPORTED = 0,
  PERMISSION_DENIED = 1,
  POSITION_UNAVAILABLE = 2,
  TIMEOUT = 3,
}

type GeolocationError = { code: GeolocationErrorCode; message: string };

const GeolocationNotSupportedError: GeolocationError = {
  code: GeolocationErrorCode.NOT_SUPPORTED,
  message: "GPS가 지원되지 않는 기기입니다.",
};

type GeolocationData =
  | {
      position: GeolocationPosition;
      error: null;
      status: "success";
    }
  | {
      position: GeolocationPosition | null;
      error: GeolocationError;
      status: "error";
    }
  | {
      position: null;
      error: null;
      status: "pending";
    };

export function useGeolocation(): GeolocationData {
  const [data, setData] = useState<GeolocationData>({
    position: null,
    error: null,
    status: "pending",
  });

  const onSuccess: PositionCallback = (position) => {
    setData({ position, error: null, status: "success" });
  };

  // 에러가 발생해도 마지막 위치 정보는 유지합니다.
  const onError: PositionErrorCallback = (error) => {
    setData((prev) => ({ position: prev.position, error, status: "error" }));
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setData({
        position: null,
        error: GeolocationNotSupportedError,
        status: "error",
      });
      return;
    }

    const watchId = geo.watchPosition(onSuccess, onError);

    return () => geo.clearWatch(watchId);
  }, []);

  return data;
}

export function getGeolocation() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(GeolocationNotSupportedError);
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
