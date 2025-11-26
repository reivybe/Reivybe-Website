if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  const addBtn = document.querySelector(".addProductBtn");
  // Cache form field elements so we can read values
  const name = document.getElementById("name");
  const category = document.getElementById("category");
  const sub1 = document.getElementById("sub1");
  const sub2 = document.getElementById("sub2");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const link = document.getElementById("link");
  const color = document.getElementById("color");
  const size = document.getElementById("size");
  const company = document.getElementById("company");

  addBtn.addEventListener("click", () => {
    const data = {
      name: name.value,
      category: category.value,
      sub1: sub1.value,
      sub2: sub2.value,
      description: description.value,
      price: price.value,
      link: link.value,
      color: color.value,
      size: size.value,
      company: company.value
    };

    if (addBtn.dataset.mode === "edit") {
      // UPDATE PRODUCT
      const editId = addBtn.dataset.id;

      fetch(`http://localhost:5000/products/update/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(msg => {
          alert(msg.message);
          addBtn.dataset.mode = "add";
          addBtn.innerText = "Add Product";
          clearForm();
          loadProducts();
        });

    } else {
      // ADD PRODUCT
      fetch("http://localhost:5000/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(msg => {
          alert(msg.message);
          clearForm();
          loadProducts();
        });
    }
  });
});

// CLEAR FORM
function clearForm() {
  name.value = "";
  category.value = "";
  sub1.value = "";
  sub2.value = "";
  description.value = "";
  price.value = "";
  link.value = "";
  color.value = "";
  size.value = "";
  company.value = "";
}

// LOAD PRODUCTS
function loadProducts() {
  fetch("http://localhost:5000/products/all")
    .then(res => res.json())
    .then(products => {
      const container = document.querySelector(".productsContainer");
      container.innerHTML = "";

      products.forEach(p => {
        const row = document.createElement("div");
        row.className = "grid grid-cols-7 py-4 px-4 border-b";

        row.innerHTML = `
          <div class="w-10 h-10 bg-black"></div>
          <div>${p.name}</div>
          <div>${p.category}</div>
          <div>₹${p.price}</div>
          <div>Active</div>
          <div class="cursor-pointer text-blue-600 editBtn" data-id="${p.id}">Edit</div>
          <div class="cursor-pointer text-red-600 deleteBtn" data-id="${p.id}">Delete</div>
        `;

        container.appendChild(row);
      });

      enableActions();
    });
}

// ENABLE EDIT + DELETE
function enableActions() {
  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      if (confirm("Delete this product?")) {
        fetch(`http://localhost:5000/products/delete/${id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(msg => {
            alert(msg.message);
            loadProducts();
          });
      }
    });
  });

  document.querySelectorAll(".editBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      fetch(`http://localhost:5000/products/all`)
        .then(res => res.json())
        .then(products => {
          const p = products.find(x => x.id == id);

          name.value = p.name;
          category.value = p.category;
          sub1.value = p.sub1;
          sub2.value = p.sub2;
          description.value = p.description;
          price.value = p.price;
          link.value = p.link;
          color.value = p.color;
          size.value = p.size;
          company.value = p.company;

          const addBtn = document.querySelector(".addProductBtn");
          addBtn.innerText = "Update Product";
          addBtn.dataset.mode = "edit";
          addBtn.dataset.id = id;
        });
    });
  });
}



