var $usernameFld, $passwordFld
var $firstNameFld, $lastNameFld, $roleFld
var $removeBtn, $editBtn, $createBtn, $updateBtn
var $userRowTemplate, $tbody

var adminUserService = new AdminUserServiceClient()

// console.log(users)

function createUser() {
  alert("create course")
  var newUser = {
    username: $usernameFld.val(),
    password: $passwordFld.val(),
    firstName: $firstNameFld.val(),
    lastName: $lastNameFld.val(),
    role: $roleFld.val()
  }

  // console.log(newUser)

  adminUserService.createUser(newUser)
  .then(function (actualUser) {
    users.push(actualUser)
    renderUsers(users)
  })
  console.log(111)
  $usernameFld.val("")
  $passwordFld.val("")
  $firstNameFld.val("")
  $lastNameFld.val("")
  $roleFld.val("Faculty")
}

function renderUsers(users) {
  $tbody.empty()
  // console.log(users, "renderusertest")
  for (var i = 0; i < users.length; i++) {
    var user = users[i]
    $tbody
    // .append(`
    //   <tr>
    //       <td class="wbdv-username">${user.username}</td>
    //       <td>&nbsp;</td>
    //       <td class="wbdv-first-name">${user.firstName}</td>
    //       <td class="wbdv-last-name">${user.lastName}</td>
    //       <td class="wbdv-role">${user.role}</td>
    //       <td class="wbdv-actions">
    //         <span class="float-right">
    //           <i id="${i}" class="fa-2x fa fa-times wbdv-remove"></i>
    //           <i id="${user._id}" class="fa-2x fa fa-pencil wbdv-edit"></i>
    //         <span>
    //       </td>
    //   </tr>
    //   `)
    .append(`
      <tr>
          <td>${user.username}</td>
          <td>&nbsp;</td>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.role}</td>
          <td>
            <span class="float-right">
              <i id="${i}" class="fa-2x fa fa-times wbdv-remove"></i>
              <i id="${user._id}" class="fa-2x fa fa-pencil wbdv-edit"></i>
            <span>
          </td>
      </tr>
      `)
  }

  $(".wbdv-remove").click(deleteUser)
  $(".wbdv-edit").click(selectUser)
}

function deleteUser(event) {
  alert("delete course")
  var button = $(event.target)
  var index = button.attr("id")
  var id = users[index]._id
  adminUserService.deleteUser(id)
  .then(function (status) {
    users.splice(index, 1)
    renderUsers(users)
  })
}

var selectedUser = null

function selectUser(event) {
  var id = $(event.target).attr("id")
  console.log(id)
  console.log(users)
  selectedUser = users.find(user => user._id === id)
  $usernameFld.val(selectedUser.username)
  $passwordFld.val(selectedUser.password)
  $firstNameFld.val(selectedUser.firstName)
  $lastNameFld.val(selectedUser.lastName)
  $roleFld.val(selectedUser.role)
}

function updateUser() {
  // alert(`update user: ${selectedUser.username}`)
  selectedUser.username = $usernameFld.val()
  selectedUser.password = $passwordFld.val()
  selectedUser.firstName = $firstNameFld.val()
  selectedUser.lastName = $lastNameFld.val()
  selectedUser.role = $roleFld.val()
  console.log(selectedUser)
  $usernameFld.val("")
  $passwordFld.val("")
  $firstNameFld.val("")
  $lastNameFld.val("")
  $roleFld.val("Faculty")

  adminUserService.updateUser(selectedUser._id, selectedUser).then(status => {
    var index = users.findIndex(user => user._id === selectedUser._id)
    users[index] = selectedUser
    renderUsers(users)
  })
  selectedUser = null

}

function main() {
  $createBtn = jQuery("#createBtnId")
  $updateBtn = jQuery(".wbdv-update")

  $userRowTemplate = $(".wbdv-tbody")
  $tbody = $(".wbdv-tbody")
  $usernameFld = $("#usernameFld")
  $passwordFld = $("#passwordFld")
  $firstNameFld = $("#firstNameFld")
  $lastNameFld = $("#lastNameFld")
  $roleFld = $("#roleFld")

  $createBtn.click(createUser)
  $updateBtn.click(updateUser)

  adminUserService.findAllUsers().then(function (actualUsers) {
    users = actualUsers
    console.log(users)
    renderUsers(users)
  })
}

$(main)