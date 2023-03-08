export async function GET(request: Request) {
  return new Response()
}

export async function POST(request: Request) {
  if ("application/json" === request.headers.get("content-type")) {
    const body = await request.json();
    const response = await fetch("https://api.supermomos-dev.com/interview/social", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });

    const isSuccess = response.ok && response.status === 200;
    return new Response(JSON.stringify({
      success: isSuccess,
      code: isSuccess ? 200 : 500,
      error: isSuccess ? null : response.statusText,
      data: await response.json()
    }));
  }
  else {
    return new Response(JSON.stringify({
      success: false,
      code: 415,
      error: "Unsupported Media Type"
    }));
  }
}