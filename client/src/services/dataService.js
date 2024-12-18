export const fetchData = async () => {
  try {
    const [urunlerRes, expensesRes, productsRes] = await Promise.all([
      fetch('http://localhost:5000/api/urunler'),
      fetch('http://localhost:5000/api/veriler4'),
      fetch('http://localhost:5000/api/veriler')
    ]);

    if (!urunlerRes.ok || !expensesRes.ok || !productsRes.ok) {
      throw new Error('Bir veya daha fazla API isteği başarısız oldu');
    }

    const urunler = await urunlerRes.json();
    const expenses = await expensesRes.json();
    const products = await productsRes.json();

    console.log('Çekilen veriler:', { urunler, expenses, products });

    return {
      urunler,
      expenses,
      products
    };
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    throw error;
  }
};