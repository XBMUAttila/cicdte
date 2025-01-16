export default function CloudStorage(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({ message: 'Get user data' });
      break;
    case 'POST':
      res.status(201).json({ message: 'User created' });
      break;
    case 'PUT':
      res.status(200).json({ message: 'User updated' });
      break;
    case 'DELETE':
      res.status(200).json({ message: 'User deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  res.status(200).json({ message: 'Hello, World!' });
}
