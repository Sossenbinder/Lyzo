import { NetworkResponse } from "./Types/NetworkDefinitions";

export enum RequestMethods {
	GET = "GET",
	POST = "POST"
}

export default class AjaxRequest<TRequest, TResponse> {

	private m_url: string;

	private m_requestMethod: string;

	constructor(
		url: string,
		requestMethod: RequestMethods = RequestMethods.POST) {
		this.m_url = url;
		this.m_requestMethod = requestMethod;
	}

	protected async send(requestData?: TRequest, attachVerificationToken: boolean = true): Promise<NetworkResponse<TResponse>> {

		const requestInit: RequestInit = {
			method: this.m_requestMethod,
			cache: "no-cache",
			headers: {
				'Accept': 'application/json, text/javascript, */*',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		};

		if (attachVerificationToken) {
			const tokenHolder = document.getElementsByName("__RequestVerificationToken")[0] as HTMLInputElement;
			requestInit.headers["RequestVerificationToken"] = tokenHolder.value;
		}

		if (this.m_requestMethod === RequestMethods.POST && typeof requestData !== "undefined") {
			requestInit.body = JSON.stringify(requestData);
		}

		const response = await fetch(this.m_url, requestInit);

		const jsonResponse = response.ok ? await response.json() : undefined;

		const payload: TResponse = typeof jsonResponse !== "undefined" ? jsonResponse?.data as TResponse : undefined;

		return {
			success: typeof jsonResponse !== "undefined" ? jsonResponse.success : false,
			payload,
		};
	}
}