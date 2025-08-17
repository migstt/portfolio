// run this script to re-authorize with correct scopes
const CLIENT_ID = "123qwe";
const CLIENT_SECRET = "123qwe";

console.log("1: visit this url to authorize with activity:read_all scope:");
console.log(`https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost&approval_prompt=force&scope=read,activity:read_all`);
console.log("\n2: copy the 'code' parameter from the redirect url");
console.log("3: replace AUTHORIZATION_CODE below and run the exchangeTokens function\n");

async function exchangeTokens(authorizationCode) {
  try {
    const response = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: authorizationCode,
        grant_type: "authorization_code",
      }),
    });

    if (response.ok) {
      const tokens = await response.json();
      
      console.log("new tokens received:");
      console.log("access token:", tokens.access_token);
      console.log("refresh token:", tokens.refresh_token);
      console.log("expires at:", new Date(tokens.expires_at * 1000).toISOString());
      console.log("scopes:", tokens.scope);
      
      console.log("\nupdate your .env.local file:");
      console.log("STRAVA_CLIENT_ID=123qwe");
      console.log("STRAVA_CLIENT_SECRET=123qwe");
      console.log(`STRAVA_REFRESH_TOKEN=${tokens.refresh_token}`);
      
    } else {
      const error = await response.text();
      console.error("error exchanging tokens:", error);
    }
  } catch (error) {
    console.error("network error:", error);
  }
}

// uncomment and replace AUTHORIZATION_CODE with actual code:
// exchangeTokens("AUTHORIZATION_CODE");

// example:
// exchangeTokens("123123");