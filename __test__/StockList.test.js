/**
 * I Lagerförteckningen ska det finnas en lista med produkter. Listan ska innehålla produktens namn och lagersaldo.
 * Kolla om StockList komponent innehåller alltid samma data och har inget ovändate beteende;
 */

import { render } from '@testing-library/react-native';
import StockList from '../components/StockList';

const products = [
    { name: "Tulip", stock: 60 },
    { name: "Daisy", stock: 202 },
    { name: "Peony", stock: 35 },
];

const setProducts = () => false;

test('List should contain three items', async () => {
    const { getByText, debug } = render(<StockList products={products} setProducts={setProducts} />);
//     debug("Stocklist component");

    const tulip = await getByText('Tulip', { exact: false });
    const daisy = await getByText('Daisy', { exact: false });
    const peony = await getByText('Peony', { exact: false });

    expect(tulip).toBeDefined();
    expect(daisy).toBeDefined();
    expect(peony).toBeDefined();
});

test("Testing that the component does not behave unexpectedly, creating snapshop", () => {
    const tree = render(<StockList products={products} setProducts={setProducts} />).toJSON();
    expect(tree).toMatchSnapshot();
})