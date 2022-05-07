import { render, fireEvent } from '@testing-library/react-native';
import DeliveryForm from './../components/DeliveryForm';

const navigation = () => false;
const mockSetProducts = jest.fn();
const mockAddDelivery = jest.fn();

test("testing create a new delivery", async () => {
    const { queryByTestId } = render(<DeliveryForm 
        navigation={navigation}
        setProducts={mockSetProducts}
    />);

    const productDropDown = await queryByTestId("product-dropdown");
    const dateDropDown = await queryByTestId("date-dropdown");
    const antal = await queryByTestId("antal");
    const kommentar = await queryByTestId("kommentar");
    const submitButton = await queryByTestId("submitBtn");
    
    expect(productDropDown).toBeDefined();
    expect(dateDropDown).toBeDefined();
    expect(antal).toBeDefined();
    expect(kommentar).toBeDefined();
    expect(submitButton).toBeDefined();


/*    fireEvent.click(submitButton);
    expect(mockSubmit).toHaveBeenCalled();*/
});