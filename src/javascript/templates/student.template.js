export class StudentTemplate {
  // Display table rows when data is passed in
  static renderTableRow(move) {
    const tableRow = `
    <tr class="content-row" data-id=${move.id}>
      <td>
        <img src="/avatar.7bb99cdb.svg" alt="avatar student" class="avt-student"/>
      </td>
      <td>${move.name}</td>
      <td>${move.email}</td>
      <td>${move.phone}</td>
      <td>${move.enrollnumber}</td>
      <td>${move.dateofadmission}</td>
      <td>
        <button class="btn-table btn-edit" aria-label="Edit student" data-id=${move.id}>
          <img src="/btn-edit.20bca2e1.svg" alt="button edit" />
        </button>
      </td>
      <td>
        <button class="btn-table btn-delete btn-table-delete" aria-label="Delete student" data-id=${move.id}>
          <img src="/btn-delete.0d75958c.svg" alt="button delete" />
        </button>
      </td>
    </tr>
    <tr class="spacer">
      <td></td>
    </tr>`
    
    return tableRow;
  } 
}
