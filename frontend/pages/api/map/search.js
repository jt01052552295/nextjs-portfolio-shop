import axios from "axios";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return search();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function search() {
    const { keyword, page } = req.query;

    try {
      const result = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/area/map?keyword=${encodeURIComponent(keyword)}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json({
        success: true,
        body: result.data.body,
        is_end: result.data.is_end,
        pageable_count: result.data.pageable_count,
        status: result.data.status,
        total_count: result.data.total_count,
      });
    } catch (e) {
      res.json({ success: false, message: e });
    }
  }
}
