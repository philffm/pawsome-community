<script>
  export let user = {};
</script>

<div class="profile-header">
  <div class="avatar-container">
    <img
      src={user.avatar ? `https://supa.ueee.eu/api/files/_pb_users_auth_/${user.id}/${user.avatar}` : '/default-avatar.png'}
      alt="Avatar Preview"
    />
  </div>
  <div class="user-info">
    <h2>{user.name}</h2>
    <p class="verification-status">
      {user.verified ? '✔ Verified' : '❌ Not Verified'}
    </p>
  </div>
</div>

<style>
  .profile-header {
    text-align: center;
    padding: 20px;
    margin-bottom: 20px;
  }

  .avatar-container {
    margin-bottom: 15px;
    border-radius: 50%;
    overflow: hidden;
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border: 4px solid #a5d9d0;
  }

  .avatar-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-info h2 {
    margin: 0;
    font-size: 1.8rem;
  }

  .verification-status {
    margin-top: 5px;
    font-size: 1rem;
    color: #666;
  }
</style>
