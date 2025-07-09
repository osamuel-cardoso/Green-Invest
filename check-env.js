require('dotenv').config({ path: '.env.local' });

console.log('Verificando variáveis de ambiente...\n');

const requiredEnvVars = ['NEXT_HYGRAPH_ENDPOINT', 'HYGRAPH_TOKEN'];

let hasErrors = false;

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  
  if (!value) {
    console.error(`❌ ${varName} não está definida`);
    hasErrors = true;
  } else {
    console.log(`✅ ${varName} está definida`);
    
    // Mostra parte do valor para debug (escondendo informações sensíveis)
    const preview = varName.includes('TOKEN') 
      ? value.substring(0, 10) + '...' 
      : value.substring(0, 30) + '...';
    console.log(`   Valor: ${preview}\n`);
  }
});

if (hasErrors) {
  console.error('\n⚠️  Por favor, configure as variáveis de ambiente no arquivo .env.local');
  console.error('   Veja o arquivo .env.example para referência.');
  process.exit(1);
} else {
  console.log('\n✨ Todas as variáveis de ambiente estão configuradas!');
}