export const deliveryOptions = [
  {
    id : '1',
    inDeliveryDays : 7,
    priceCents : 0
  },
  {
    id : '2',
    inDeliveryDays : 3,
    priceCents : 499
  },
  {
    id : '3',
    inDeliveryDays : 1,
    priceCents : 999
  }
];

export function getDeliveryOption(cartItem){
  let matchedOption;
  deliveryOptions.forEach( (option) => {
    if( option.id === cartItem.deliveryOptionsId) {
      matchedOption = option;
    };
  });
  return matchedOption || deliveryOptions[1];
};