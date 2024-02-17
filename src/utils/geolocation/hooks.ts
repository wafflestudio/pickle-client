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

export function useGeolocation() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");

  const onSuccess: PositionCallback = (position) => {
    setPosition(position);
    setError(null);
    setStatus("success");
  };

  // 에러가 발생해도 마지막 위치 정보는 유지합니다.
  const onError: PositionErrorCallback = (error) => {
    setError(error);
    setStatus("error");
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError(GeolocationNotSupportedError);
      return;
    }

    const watchId = geo.watchPosition(onSuccess, onError);

    return () => geo.clearWatch(watchId);
  }, []);

  return { position, error, status };
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
