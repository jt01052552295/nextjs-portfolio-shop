import axios from "axios";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return signin();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function signin() {
    const { email, password } = req.body;

    try {
      const send_data = JSON.stringify({
        email: email,
        password: password,
      });

      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/employee/auth`,
        send_data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.data.email === email) {
        //   const token = jwt.sign({ sub: result.data.email }, serverRuntimeConfig.secret, {
        //     expiresIn: '7d',
        //   });
        return res.status(200).json({
          success: true,
          //   signup: '가입완료?',
          //   result: result.data,
          email: result.data.email,
          username: result.data.name,
        });
      } else {
        res.json({ success: false, message: "로그인 실패하였습니다!" });
      }
    } catch (e) {
      res.json({ success: false, message: e });
    }
  }
}
