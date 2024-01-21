<template>
  <div class="hero-body">
    <div class="container has-text-centered is-family-monospace">
      <form action="" class="control">
        <div class="field">
          <label for="usname" class="title is-italic">username</label>
          <input
            id="usname"
            class="input has-text-centered"
            type="text"
            required
          />
        </div>
        <div class="field">
          <label for="pass" class="title is-italic">password</label>
          <input
            id="pass"
            class="input has-text-centered"
            type="password"
            autocomplete="off"
            required
          />
        </div>
        <div class="field">
          <label for="pass" class="title is-italic">confirm password</label>
          <input
            id="pass"
            class="input has-text-centered"
            type="password"
            autocomplete="off"
            required
          />
        </div>
        <div class="field">
          <button class="button is-white is-outlined is-rounded is-medium">
            REGISTER
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup></script>
