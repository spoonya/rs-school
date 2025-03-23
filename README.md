# Performance

<style>
  .improved-table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    margin-bottom: 50px;
  }
  .improved-table th, .improved-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  .improved-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  .improved-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .improved-table tr:hover {
    background-color: #f1f1f1;
  }
  .image-container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-bottom: 40px;
  }
  .image-pair {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    margin-bottom: 40px;
  }
  .image-pair img {
    width: 100%;
    max-width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .image-pair p {
    text-align: center;
    font-size: 18px;
    color: #333;
    margin-top: 10px;
    font-weight: bold;
  }
  .image-pair .before, .image-pair .after {
    width: 100%;
    text-align: center;
  }
</style>

<table class="improved-table">
  <tr>
    <th></th>
    <th colspan="2">BEFORE</th>
    <th colspan="2">AFTER</th>
  </tr>

  <tr>
    <th>Interactions</th>
    <th>Commit Duration</th>
    <th>Render Duration</th>
    <th>Commit Duration</th>
    <th>Render Duration</th>
  </tr>
  <tr>
    <td>App init</td>
    <td>1.9</td>
    <td>156.5</td>
    <td>2.2</td>
    <td>159.7</td>
  </tr>
  <tr>
    <td>Filter</td>
    <td>0.7</td>
    <td>29.6</td>
    <td>0.7</td>
    <td>27.8</td>
  </tr>
  <tr>
    <td>Sort</td>
    <td>1.5</td>
    <td>105.4</td>
    <td>1.9</td>
    <td>108.1</td>
  </tr>
  <tr>
    <td>Search</td>
    <td>0.7</td>
    <td>37.3</td>
    <td>0.7</td>
    <td>37.5</td>
  </tr>
</table>

<div class="image-container">
<div class="image-pair">
    <div class="before">
      <img src="/profiler/start-before.PNG" alt="Filter Before">
      <p>App init Before</p>
    </div>
    <div class="after">
      <img src="/profiler/start-after.PNG" alt="Filter After">
      <p>App init After</p>
    </div>
  </div>
  <div class="image-pair">
    <div class="before">
      <img src="/profiler/filter-before.PNG" alt="Filter Before">
      <p>Filter Before</p>
    </div>
    <div class="after">
      <img src="/profiler/filter-after.PNG" alt="Filter After">
      <p>Filter After</p>
    </div>
  </div>

  <div class="image-pair">
    <div class="before">
      <img src="/profiler/sort-before.PNG" alt="Sort Before">
      <p>Sort Before</p>
    </div>
    <div class="after">
      <img src="/profiler/sort-after.PNG" alt="Sort After">
      <p>Sort After</p>
    </div>
  </div>

  <div class="image-pair">
    <div class="before">
      <img src="/profiler/search-before.PNG" alt="Search Before">
      <p>Search Before</p>
    </div>
    <div class="after">
      <img src="/profiler/search-after.PNG" alt="Search After">
      <p>Search After</p>
    </div>
  </div>

  <div class="image-pair">
    <div class="before">
      <img src="/profiler/ranked-before.PNG" alt="Ranked Before">
      <p>Ranked Before</p>
    </div>
    <div class="after">
      <img src="/profiler/ranked-after.PNG" alt="Ranked After">
      <p>Ranked After</p>
    </div>
  </div>
</div>
