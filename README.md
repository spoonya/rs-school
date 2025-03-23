# Performance

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
