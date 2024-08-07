import axios from "axios";
import { useState, useContext, useMemo, useRef, useEffect } from "react";
import { AxiosContext } from "../contexts/AxiosInstanceProvider";
import { logError } from "../utils/logs";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type UseAxiosType = {
  countAxios: number;
  cancel: Function;
  data: any;
  error: any;
  loaded: boolean;
  execute: Function;
  reLoad: Function;
  waiting: number;
  setWaiting: Function;
};

const useAxios = (
  url: string | null = null,
  method: MethodType = "GET",
  payload: object = {}
): UseAxiosType => {
  const [data, setData] = useState<any>(null);
  const [error, setError]: any = useState("");
  const [loaded, setLoaded] = useState(false);
  const [countAxios, setCountAxios] = useState(0);
  const { contextInstance, waiting, setWaiting }: any =
    useContext(AxiosContext);
  const instance: any = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };
  const reLoad = async (_payload: any = null, prevent = false) => {
    if (prevent && countAxios == 0) return;
    await execute(url, method, _payload || payload, true);
  };
  const execute: any = async (
    _url: string | null = url,
    _method: MethodType = method,
    payload: any = {},
    Act: Boolean = false
  ) => {
    setWaiting(1, "execute:" + _url);
    setError("");
    setLoaded(false);
    if (_method == "GET" && payload) {
      _url = _url + "?" + new URLSearchParams(payload).toString();
    }

    let data = null;
    let error: null | { message: string; status: number; data: any } = null;
    try {
      const response = await instance.request({
        signal: controllerRef.current.signal,
        data: payload,
        method: _method,
        url: _url,
      });
      if (Act) {
        setData(response.data);
      }

      data = response.data;
    } catch (err) {
      logError("error useAxios", err);
      error = {
        message: (err as any).message,
        data: (err as any).response?.data || {},
        status: (err as any).response?.status || 0,
      };
      setError(error);
    } finally {
      setWaiting(-1, "-execute:" + _url);
      setLoaded(true);
    }

    return { data, error, loaded };
  };

  useEffect(() => {
    if (url) {
      setCountAxios(countAxios + 1);
      execute(url, method, payload, true);
    } else {
      setError("");
      setData([]);
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    countAxios,
    cancel,
    data,
    error,
    loaded,
    execute,
    reLoad,
    waiting,
    setWaiting,
  };
};

export default useAxios;
