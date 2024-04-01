
  <template>
    <div class="dashboard">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Breakfast</div>
            <div class="card-body">
              {{  }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Lunch</div>
            <div class="card-body">
              {{  }}
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Dinner</div>
            <div class="card-body">
              {{  }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Snack</div>
            <div class="card-body">
              {{  }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Table',
  };
  </script>
  
  <style scoped>
  .dashboard {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .table-container {
    background: #f9f9f9;
    padding: 20px;
  }
  </style>