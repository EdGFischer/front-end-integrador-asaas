<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white text-primary px-6 py-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/">
          <img src="../public/logo.png" alt="Logo" class="h-10 w-auto cursor-pointer" />
        </NuxtLink>
        <nav class="space-x-4">
          <NuxtLink to="/login" class="hover:underline">Acesso Restrito</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 container mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>