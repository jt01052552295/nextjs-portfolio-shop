import axios from "axios";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return list();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function list() {
    // const { keyword, page } = req.query;

    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/item/mock.json`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json({
        success: true,
        items: result.data.items,
        total_count: result.data.items.length,
      });
    } catch (e) {
      res.json({ success: false, message: e });
    }
  }
}
