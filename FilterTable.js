function ProductCategoryRow({ category }) {
  return React.createElement('tr', null,
    React.createElement('th', { colSpan: 2 }, category)
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    React.createElement('span', { style: { color: 'red' } }, product.name);

  return React.createElement('tr', null,
    React.createElement('td', null, name),
    React.createElement('td', null, product.price)
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(React.createElement(ProductCategoryRow, { category: product.category, key: product.category }));
    }
    rows.push(React.createElement(ProductRow, { product: product, key: product.name }));
    lastCategory = product.category;
  });

  return React.createElement('table', null,
    React.createElement('thead', null,
      React.createElement('tr', null,
        React.createElement('th', null, 'Name'),
        React.createElement('th', null, 'Price')
      )
    ),
    React.createElement('tbody', null, rows)
  );
}

function SearchBar({filterText, inStockOnly, onFilterTextInput, onInStockInput}) {
  return React.createElement('form', {className:'flex flex-col'},
    React.createElement('input', {
      type: 'text',
      value:filterText,
      className:'input input-primary input-sm rounded-sm max-w-40',
      placeholder: 'Search...',
      onChange: (e) => onFilterTextInput(e.target.value)
    }),
    React.createElement('label', null,
      React.createElement('input', {
        type: 'checkbox',
        checked:inStockOnly,
        className:'checkbox checkbox-primary checkbox-sm rounded-sm',
        onChange: (e) => onInStockInput(e.target.checked)
      }),
      ' Only show products in stock'
    )
  );
}

export default function FilterTable() {
  const [filterText, setFilterText] = React.useState('');
  const [inStockOnly, setInStockOnly] = React.useState(false);
  const products = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
  ];
  return React.createElement('div', null,
    React.createElement(SearchBar, {filterText: filterText, inStockOnly: inStockOnly, onFilterTextInput: setFilterText, onInStockInput: setInStockOnly}),
    React.createElement(ProductTable, { products: products, filterText: filterText, inStockOnly: inStockOnly }),
  );
}