
enum Option {
  TAG = "tag",
  PRIVACY = "privacy"
}

type ReqParams = {
  option: Option
}

export async function GET(request: Request, { params }: { params: ReqParams }) {
  if (params.option === Option.TAG) {
    return new Response(JSON.stringify(["Product", "Marketing", "Design", "Engineering"]));
  }
  else if (params.option === Option.PRIVACY) {
    return new Response(JSON.stringify([
      { id: "public", title: "Public", value: "Public", isDefault: true },
      { id: "curated_audience", title: "Curated Audience", value: "Curated Audience", isDefault: false },
      { id: "community_only", title: "Community Only", value: "Community Only", isDefault: false }
    ]));
  }
}