import { HttpModule, Module } from '@nestjs/common';
import { OmdbapiController } from './omdbapi.controller';
import { OmdbapiService } from './omdbapi.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://www.omdbapi.com/',
      timeout: 10000,
    })
  ],
  exports: [HttpModule],
  controllers: [OmdbapiController],
  providers: [OmdbapiService],
})
export class OmdbapiModule {}

/**
 * 
  url?: string;
  method?: Method;
  baseURL?: string;
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  headers?: any;
  params?: any;
  paramsSerializer?: (params: any) => string;
  data?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  adapter?: AxiosAdapter;
  auth?: AxiosBasicCredentials;
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: AxiosProxyConfig | false;
  cancelToken?: CancelToken;
  decompress?: boolean;
 */