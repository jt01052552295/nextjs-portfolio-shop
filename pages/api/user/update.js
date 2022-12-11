import axios from "axios";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return register();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function register() {
    const send_data = JSON.stringify(req.body);

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/employee/update`,
        send_data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json({
        success: true,
        email: result.data.email,
        username: result.data.name,
        hp: result.data.hp,
        result: result.data,
      });
    } catch (e) {
      res.status(404).json({ success: false, message: e });
    }
  }
}
