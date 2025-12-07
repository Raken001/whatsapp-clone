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

import { MessageRequest } from '../models/message-request';
import { MessageResponse } from '../models/message-response';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation saveMessage
   */
  static readonly SaveMessagePath = '/api/v1/messages';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveMessage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveMessage$Response(params: {
    body: MessageRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, MessageService.SaveMessagePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveMessage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveMessage(params: {
    body: MessageRequest
  }): Observable<void> {

    return this.saveMessage$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation setMessageToSeen
   */
  static readonly SetMessageToSeenPath = '/api/v1/messages';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setMessageToSeen()` instead.
   *
   * This method doesn't expect any request body.
   */
  setMessageToSeen$Response(params: {
    'chat-id': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, MessageService.SetMessageToSeenPath, 'patch');
    if (params) {
      rb.query('chat-id', params['chat-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setMessageToSeen$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setMessageToSeen(params: {
    'chat-id': string;
  }): Observable<void> {

    return this.setMessageToSeen$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation uploadMedia
   */
  static readonly UploadMediaPath = '/api/v1/messages/upload-media';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadMedia()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadMedia$Response(params: {
    'chat-id': string;
    body?: { 'file': Blob }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, MessageService.UploadMediaPath, 'post');
    if (params) {
      rb.query('chat-id', params['chat-id'], {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadMedia$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadMedia(params: {
    'chat-id': string;
    body?: { 'file': Blob }
  }): Observable<void> {

    return this.uploadMedia$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAllMessages
   */
  static readonly GetAllMessagesPath = '/api/v1/messages/chat/{chat-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllMessages()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMessages$Response(params: {
    'chat-id': string;
  }): Observable<StrictHttpResponse<Array<MessageResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, MessageService.GetAllMessagesPath, 'get');
    if (params) {
      rb.path('chat-id', params['chat-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MessageResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllMessages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMessages(params: {
    'chat-id': string;
  }): Observable<Array<MessageResponse>> {

    return this.getAllMessages$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MessageResponse>>) => r.body as Array<MessageResponse>)
    );
  }

}
