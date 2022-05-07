import { render } from '@testing-library/react-native';
import Home from './../components/Home';

jest.mock("../components/Stock", () => "Stock");

const products = [];

const setProducts = () => false;

test("testing that Home component contains title Lager_Appen", async () => {
    const { getByText } = render(<Home products={products} setProducts={setProducts}/>);
    const title = await getByText('Lager-Appen');

    expect(title).toBeDefined();
});