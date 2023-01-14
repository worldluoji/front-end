<script>
  function navigate(e) {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    // single-spa监听了history，根据history变化来更新微前端
    window.history.pushState(null, null, href);
  }
</script>

<div>
  <h1>Welcome Home!</h1>
  <strong>Here are three tractors:</strong>
  <ul>
    <li>
      <a on:click={navigate} href="/product/eicher">Eicher</a>
    </li>
    <li>
      <a on:click={navigate} href="/product/porsche">Porsche</a>
    </li>
    <li>
      <a on:click={navigate} href="/product/fendt">Fendt</a>
    </li>
  </ul>
</div>
