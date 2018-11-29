interface HttpRequest {
    method: HttpMethod;
    uri: string;
    headers?: Map<string, string>;
    body?: string;
}

type HttpMethod = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'CONNECT' | 'DELETE';

interface HttpResponse {
    status: HttpStatus;
    headers?: Map<string, string>;
    body?: string;
}

type HttpStatus = 
    [200, 'OK'] |
    [404, 'Not found'] |
    [500, 'Internal server error']; // TODO

interface HttpClient {
    send (httpRequest: HttpRequest): Promise<HttpResponse>;
}

interface JsonObject {
    [key: string]: JsonValue;
}

type JsonValue = string | number | boolean | JsonObject | string[] | number[] | boolean[] | JsonObject[];

/*interface JsonHttpClient extends HttpClient<JsonObject> {
    send (httpRequest: HttpRequest): Promise<HttpResponse<JsonObject>>;
};*/