export class StudentTemplate {
  static renderTableThead() {
    const tableThead = `
    <li class="table-thead">
      <div></div>
      <div>Name</div>
      <div>Email</div>
      <div>Phone</div>
      <div>Enroll Number</div>
      <div>Date of admission</div>
      <div></div>
      <div></div>
    </li>
  `

  return tableThead;
  }

  // Display table rows when data is passed in
  static renderTableRow(move) {
    const tableRow = `
      <li class="table-row" data-id=${move.id}>
        <div><img src="/avatar.7bb99cdb.svg" alt="avatar student" class="avt-student"></div>
        <div>${move.name}</div>
        <div>${move.email}</div>
        <div>${move.phone}</div>
        <div>${move.enrollnumber}</div>
        <div>${move.dateofadmission}</div>
        <div><button class="btn-table btn-edit" data-id=${move.id}><img src="/btn-edit.87768a19.svg"></button></div>
        <div><button class="btn-table btn-delete btn-table-delete" data-id=${move.id}><img src="/btn-delete.98640746.svg"></button></div>
      </li>`

    return tableRow;
  }
}
