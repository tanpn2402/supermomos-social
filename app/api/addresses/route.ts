export async function GET(request: Request) {
  return new Response(JSON.stringify({
    success: true,
    code: 200,
    error: null,
    data: [
      {
        id: "1",
        name: "Chelsea Market",
        address: "163 W 20nd Street, Manhattan, NYC"
      },
      {
        id: "2",
        name: "Coffee Project",
        address: "155 7th Ave, New York, NYC"
      },
      {
        id: "3",
        name: "Slate NY",
        address: "54 W 21st St, New York, NYC"
      }
    ]
  }))
}
