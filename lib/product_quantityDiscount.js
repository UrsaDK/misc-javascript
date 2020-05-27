function quantityDiscount(items) {
  var quantityDiscount = totalNormalPrice(items) - totalReducedPrice(items);
  return round(quantityDiscount, 2);
}

function totalNormalPrice(items) {
  var total_price = 0;
  items.forEach(function(item) {
    total_price += itemNormalPrice(item);
  });
  return round(total_price, 2);
}

function itemNormalPrice(item) {
  var area = item.width * item.height;
  var quantity_adjustment = Math.pow(item.quantity, -0.1);
  return area * item.product.area_price * item.quantity * quantity_adjustment;
}

function totalReducedPrice(items) {
  var total_price = 0;
  var total_quantity = totalQuantity(items);
  items.forEach(function(item) {
    total_price += itemReducedPrice(item, total_quantity);
  });
  return round(total_price, 2);
}

function itemReducedPrice(item, total_quantity) {
  var area = item.width * item.height;
  var quantity_adjustment = Math.pow(total_quantity, -0.1);
  return area * item.product.area_price * item.quantity * quantity_adjustment;
}

function totalQuantity(items) {
  var total_quantity = 0;
  items.forEach(function(item) {
    total_quantity += item.quantity;
  });
  return total_quantity;
}

function round(number, decimals) {
  var multiplier = Math.pow(10, decimals);
  return Math.round(number * multiplier) / multiplier;
}
