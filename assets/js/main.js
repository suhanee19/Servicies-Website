// Inject Navbar + Footer across all pages
document.addEventListener("DOMContentLoaded", () => {
  const navbar = `
    <div class="container mx-auto flex justify-between items-center p-4">
      <a href="index.html" class="font-bold text-xl">TravelAgency</a>
      <nav>
        <ul class="flex space-x-6">
          <li><a href="index.html" class="hover:text-blue-600">Home</a></li>
          <li><a href="about.html" class="hover:text-blue-600">About</a></li>
          <li><a href="packages.html" class="hover:text-blue-600">Packages</a></li>
          <li><a href="destinations.html" class="hover:text-blue-600">Destinations</a></li>
          <li><a href="contact.html" class="hover:text-blue-600">Contact</a></li>
          <li><a href="blog.html" class="hover:text-blue-600">Blog</a></li>
        </ul>
      </nav>
    </div>
  `;
  document.getElementById("navbar").innerHTML = navbar;

  const footer = `
    <div class="container mx-auto text-center p-4 text-white">
      
    </div>
  `;
  document.getElementById("footer").innerHTML = footer;
});
