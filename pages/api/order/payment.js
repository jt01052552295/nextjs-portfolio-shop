import axios from "axios";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return payment();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function payment() {
    // const { email, password, name } = req.body;
    const send_data = JSON.stringify(req.body);

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/order/create`,
        send_data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json({ success: true, result: result.data });

      //   if (result.data.email === email) {
      //     return res.status(200).json({
      //       success: true,
      //       //   signup: '가입완료?',
      //       //   result: result.data,
      //       email: result.data.email,
      //       username: result.data.name,
      //     });
      //   } else {
      //     res.json({ success: false, message: "가입 실패하였습니다!" });
      //   }
    } catch (e) {
      return res
        .status(404)
        .json({ success: false, message: e, etc: "etc error" });
    }
  }
}
