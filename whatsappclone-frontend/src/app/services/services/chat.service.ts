/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ChatResponse } from '../models/chat-response';
import { StringResponse } from '../models/string-response';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getChatsByReceiver
   */
  static readonly GetChatsByReceiverPath = '/api/v1/chats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getChatsByReceiver()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatsByReceiver$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ChatResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ChatService.GetChatsByReceiverPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ChatResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getChatsByReceiver$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatsByReceiver(params?: {
  }): Observable<Array<ChatResponse>> {

    return this.getChatsByReceiver$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ChatResponse>>) => r.body as Array<ChatResponse>)
    );
  }

  /**
   * Path part for operation createChat
   */
  static readonly CreateChatPath = '/api/v1/chats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createChat()` instead.
   *
   * This method doesn't expect any request body.
   */
  createChat$Response(params: {
    'sender-id': string;
    'receiver-id': string;
  }): Observable<StrictHttpResponse<StringResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ChatService.CreateChatPath, 'post');
    if (params) {
      rb.query('sender-id', params['sender-id'], {});
      rb.query('receiver-id', params['receiver-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StringResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createChat$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createChat(params: {
    'sender-id': string;
    'receiver-id': string;
  }): Observable<StringResponse> {

    return this.createChat$Response(params).pipe(
      map((r: StrictHttpResponse<StringResponse>) => r.body as StringResponse)
    );
  }

}
