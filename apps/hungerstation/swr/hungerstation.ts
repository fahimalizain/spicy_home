export class HungerstationClient {
  private accessToken?: string;
  private refreshToken?: string;
  private deviceToken?: string;

  constructor(private username: string, private password: string) {
    this.authenticate();
  }

  public async authenticate(): Promise<AuthResponse> {
    const response = await this.postAPI<AuthResponse>('/auth/v4/token', {
      username: this.username,
      password: this.password,
    });

    const body = response.jsonBody;

    if (response.statusCode === 200 && body.accessToken) {
      this.accessToken = body.keymaker_response.access_token;
      this.refreshToken = body.keymaker_response.refresh_token;
      this.deviceToken = body.keymaker_response.device_token;
    }

    return response.jsonBody;
  }

  public async refreshAccessToken(): Promise<AuthResponse> {
    if (!this.refreshToken) {
      throw new Error('No refresh token');
    }

    const response = await this.postAPI<AuthResponse>('/auth/v4/token', {
      refreshToken: this.refreshToken,
    });

    const body = response.jsonBody;

    if (response.statusCode === 200 && body.accessToken) {
      this.accessToken = body.accessToken;
      this.refreshToken = body.refreshToken;
    }

    return response.jsonBody;
  }

  isAuthenticated() {
    return !!this.accessToken;
  }

  public postAPI<T>(path: string, body: unknown): Promise<APIResponse<T>> {
    return fetch(`https://vp-bff.api.eu.prd.portal.restaurant${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.accessToken
          ? { Authorization: `Bearer ${this.accessToken}` }
          : {}),
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json().then((jsonBody) => {
        return {
          statusCode: res.status,
          jsonBody,
        };
      });
    });
  }

  public async queryGQL<T>(query: string, variables: unknown): Promise<T> {
    const response = await fetch(
      'https://vagw-api.eu.prd.portal.restaurant/query',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.accessToken
            ? { Authorization: `Bearer ${this.accessToken}` }
            : {}),
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

    const jsonBody = await response.json();

    if (response.ok) {
      return jsonBody.data;
    } else {
      throw new Error(jsonBody.errors[0].message);
    }
  }
}

export type APIResponse<T> = {
  statusCode: number;
  jsonBody: T;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  role: string;
  user: {
    createdAt: string;
    email: string;
    name: string;
    locale: string;
    role: string;
  };
  accessTokenContent: {
    aud: string;
    country: string;
    exp: number;
    iat: number;
    impersonator: boolean;
    iss: string;
    sub: string;
    user: {
      createdAt: string;
      email: string;
      name: string;
      locale: string;
      role: string;
    };
    vendors: { [x: string]: { codes: string[] } };
  };
  accessTokenV2: string;
  keymaker_response: {
    access_token: string;
    refresh_token: string;
    meta: unknown;
    device_token: string;
  };
  force_reset_password: boolean;
};
