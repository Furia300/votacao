export interface ChaosExample {
  id: string;
  title: string;
  description: string;
}

export interface ModuloCaos {
  id: number;
  name: string;
  sector: string;
  icon: string;
  examples: ChaosExample[];
}

export const modulosCaos: ModuloCaos[] = [
  {
    id: 1,
    name: "Juridico",
    sector: "Administrativo / Juridico",
    icon: "Scale",
    examples: [
      {
        id: "juridico-1",
        title: "Contratos vencidos sem ninguem saber",
        description: "Obrigacoes contratuais eram controladas em planilhas Excel espalhadas por pastas compartilhadas. Ninguem sabia quando um contrato vencia ate receber uma notificacao judicial."
      },
      {
        id: "juridico-2",
        title: "Pendencias perdidas em e-mails",
        description: "As pendencias juridicas eram rastreadas por e-mail. Quando o responsavel saia de ferias, ninguem sabia o status de nenhuma acao contratual."
      },
      {
        id: "juridico-3",
        title: "Documentos contratuais em gavetas",
        description: "Termos iniciais, aditivos e documentos contratuais ficavam em pastas fisicas no armario do juridico. Encontrar um documento especifico levava horas."
      }
    ]
  },
  {
    id: 2,
    name: "Relacoes Institucionais",
    sector: "Administrativo / Juridico",
    icon: "Handshake",
    examples: [
      {
        id: "ri-1",
        title: "Oficios respondidos fora do prazo",
        description: "Oficios da autoridade portuaria chegavam por correio e ficavam dias parados na mesa de alguem. Prazos legais eram descumpridos frequentemente."
      },
      {
        id: "ri-2",
        title: "Documentos institucionais sem controle de versao",
        description: "Politicas, procuracoes e contratos eram salvos em versoes '...final_v2_revisado_FINAL.docx'. Ninguem sabia qual era a versao vigente."
      },
      {
        id: "ri-3",
        title: "Expedientes sem rastreabilidade",
        description: "Expedientes enviados a orgaos reguladores nao tinham registro centralizado. Quando cobrados, ninguem conseguia provar o que ja havia sido enviado."
      }
    ]
  },
  {
    id: 3,
    name: "Inspecao SST e MA",
    sector: "Seguranca e Saude (QSSMA)",
    icon: "HardHat",
    examples: [
      {
        id: "qssma-1",
        title: "Checklists em pranchetas de papel",
        description: "Inspetores saiam a campo com pranchetas e formularios impressos. Na volta, os papeis se acumulavam e levavam semanas para serem digitados em planilhas."
      },
      {
        id: "qssma-2",
        title: "Indicadores de seguranca sempre atrasados",
        description: "Os indices IDS e IDA eram calculados manualmente uma vez por mes. Quando os gestores viam os numeros, os problemas ja tinham se agravado."
      },
      {
        id: "qssma-3",
        title: "Plano de acoes em caderno do inspetor",
        description: "Acoes corretivas ficavam anotadas no caderno pessoal do inspetor. Se ele faltasse, ninguem sabia quais acoes estavam pendentes no campo."
      }
    ]
  },
  {
    id: 4,
    name: "App OPA",
    sector: "Seguranca e Saude (QSSMA)",
    icon: "AlertTriangle",
    examples: [
      {
        id: "opa-1",
        title: "Quase acidentes nao reportados",
        description: "Colaboradores presenciavam quase acidentes mas nao reportavam por falta de um canal simples. Incidentes repetiam porque ninguem registrava."
      },
      {
        id: "opa-2",
        title: "Condicoes inseguras comunicadas por radio",
        description: "Condicoes inseguras eram reportadas por radio ou verbalmente ao supervisor. A informacao se perdia no turno seguinte."
      },
      {
        id: "opa-3",
        title: "Sem classificacao de gravidade",
        description: "Nao existia piramide de gravidade. Todos os incidentes tinham o mesmo peso, impossibilitando priorizacao e analise de tendencias."
      }
    ]
  },
  {
    id: 5,
    name: "Gestao de Documentos",
    sector: "Administrativo / Juridico",
    icon: "FileText",
    examples: [
      {
        id: "docs-1",
        title: "Procedimentos desatualizados em circulacao",
        description: "Copias fisicas de procedimentos operacionais ficavam nas areas. Quando uma nova versao era emitida, as copias antigas continuavam sendo seguidas."
      },
      {
        id: "docs-2",
        title: "Aprovacao de documentos por assinatura fisica",
        description: "Todo procedimento novo precisava de assinatura fisica de 3 a 5 gestores. O papel circulava por semanas entre mesas ate ser aprovado."
      },
      {
        id: "docs-3",
        title: "Busca de documentos impossivel",
        description: "Para encontrar uma Instrucao de Trabalho especifica, era preciso vasculhar pastas fisicas e digitais sem padrao de nomenclatura. Levava horas."
      }
    ]
  },
  {
    id: 6,
    name: "Suprimentos",
    sector: "Administrativo / Juridico",
    icon: "ShoppingCart",
    examples: [
      {
        id: "supri-1",
        title: "Requisicoes de compra por e-mail",
        description: "Solicitacoes de materiais eram enviadas por e-mail com descricoes vagas. O comprador precisava ligar para cada solicitante para entender o que realmente precisava."
      },
      {
        id: "supri-2",
        title: "Contratos sem dashboard de acompanhamento",
        description: "O status de contratos era verificado ligando para o fornecedor. Nao havia visao consolidada de vencimentos, valores ou entregas pendentes."
      },
      {
        id: "supri-3",
        title: "Notas fiscais em caixas de papelao",
        description: "Notas fiscais eram armazenadas em caixas de papelao organizadas por mes. Uma auditoria levava dias para localizar documentos especificos."
      }
    ]
  },
  {
    id: 7,
    name: "Portal Treinamentos",
    sector: "Recursos Humanos / Pessoas",
    icon: "GraduationCap",
    examples: [
      {
        id: "trein-1",
        title: "Provas em papel corrigidas manualmente",
        description: "Provas mensais dos maquinistas eram impressas, aplicadas e corrigidas uma a uma pelo instrutor. Resultados levavam semanas para consolidar."
      },
      {
        id: "trein-2",
        title: "Listas de presenca perdidas",
        description: "Treinamentos presenciais tinham lista de presenca em papel. Muitas se perdiam antes de chegar ao RH, e colaboradores ficavam sem registro."
      },
      {
        id: "trein-3",
        title: "Vencimentos de certificacao ignorados",
        description: "Ninguem controlava quando certificacoes venciam. Colaboradores operavam com treinamentos vencidos, gerando risco operacional e legal."
      }
    ]
  },
  {
    id: 8,
    name: "TI",
    sector: "Tecnologia",
    icon: "Monitor",
    examples: [
      {
        id: "ti-1",
        title: "Acessos concedidos sem registro",
        description: "Acessos a sistemas eram concedidos por mensagem no WhatsApp. Nao havia registro de quem autorizou, quando, ou por que."
      },
      {
        id: "ti-2",
        title: "Ex-funcionarios com acessos ativos",
        description: "Quando alguem saia da empresa, ninguem lembrava de revogar os acessos. Ex-funcionarios mantinham acesso a sistemas criticos por meses."
      },
      {
        id: "ti-3",
        title: "Zero conformidade com LGPD",
        description: "Sem controle centralizado de acessos, era impossivel responder a auditorias de LGPD. Dados pessoais ficavam expostos sem rastreabilidade."
      }
    ]
  },
  {
    id: 9,
    name: "Aniversariante",
    sector: "Recursos Humanos / Pessoas",
    icon: "Cake",
    examples: [
      {
        id: "aniv-1",
        title: "Aniversarios esquecidos",
        description: "A lista de aniversariantes era uma planilha do Excel que ninguem atualizava. Colaboradores passavam o dia sem sequer um 'parabens' da empresa."
      },
      {
        id: "aniv-2",
        title: "E-mail generico enviado com atraso",
        description: "O RH enviava e-mails de aniversario manualmente, muitas vezes com dias de atraso. Alguns colaboradores nunca recebiam."
      },
      {
        id: "aniv-3",
        title: "Sem integracao entre areas",
        description: "Cada gerencia controlava aniversarios do seu time separadamente. Nao havia visao unificada da empresa para celebracoes coletivas."
      }
    ]
  },
  {
    id: 10,
    name: "Inspecao Terminais",
    sector: "Seguranca e Saude (QSSMA)",
    icon: "ClipboardCheck",
    examples: [
      {
        id: "insp-term-1",
        title: "Checklists em formularios carbonados",
        description: "Inspecoes de terminais usavam formularios em 3 vias (carbono). A copia ficava ilegivel e os dados nunca eram tabulados para analise."
      },
      {
        id: "insp-term-2",
        title: "Anomalias reportadas no fim do mes",
        description: "Problemas encontrados em inspecoes so chegavam aos gestores no relatorio mensal impresso. Acoes corretivas comecavam semanas depois."
      },
      {
        id: "insp-term-3",
        title: "Sem padrao entre inspetores",
        description: "Cada inspetor avaliava itens diferentes. Nao havia checklist padronizado, tornando impossivel comparar resultados entre periodos."
      }
    ]
  },
  {
    id: 11,
    name: "PCX",
    sector: "Operacao Ferroviaria",
    icon: "Train",
    examples: [
      {
        id: "pcx-1",
        title: "Lousa fisica com giz",
        description: "O controle de trens, produtos e horarios era feito em uma lousa branca com caneta. Quando apagava, perdia-se todo o historico do turno."
      },
      {
        id: "pcx-2",
        title: "Informacoes restritas a quem estava presente",
        description: "So quem estava fisicamente na sala de controle sabia a situacao dos trens. Gestores remotos ligavam a cada 30 minutos para perguntar."
      },
      {
        id: "pcx-3",
        title: "Sem alertas visuais para situacoes criticas",
        description: "Atrasos criticos e situacoes de emergencia eram comunicados por radio. Sem painel visual, a informacao dependia de quem ouviu o radio."
      }
    ]
  },
  {
    id: 12,
    name: "MRS",
    sector: "Operacao Ferroviaria",
    icon: "Train",
    examples: [
      {
        id: "mrs-1",
        title: "Formacao de vazios controlada por telefone",
        description: "A coordenacao com a MRS era feita por telefone. Horarios de trens prontos eram anotados em papel e frequentemente divergiam dos registros da MRS."
      },
      {
        id: "mrs-2",
        title: "Tempo ocioso sem justificativa",
        description: "Ninguem registrava o tempo ocioso entre formacao e partida. Horas de locomotiva parada passavam despercebidas sem justificativa."
      },
      {
        id: "mrs-3",
        title: "EOT instalado sem controle de tempo",
        description: "A instalacao do EOT (End of Train) nao tinha registro de inicio e fim. Era impossivel medir eficiencia da equipe de patio."
      }
    ]
  },
  {
    id: 13,
    name: "FIPS IDEIAS",
    sector: "Tecnologia",
    icon: "Lightbulb",
    examples: [
      {
        id: "ideias-1",
        title: "Caixa de sugestoes ignorada",
        description: "A empresa tinha uma caixa de sugestoes fisica na portaria. Os papeis eram recolhidos uma vez por mes e raramente lidos pela gestao."
      },
      {
        id: "ideias-2",
        title: "Ideias sem feedback ao colaborador",
        description: "Quando alguem sugeria uma melhoria, nunca recebia retorno. A desmotivacao fazia com que as pessoas parassem de contribuir."
      },
      {
        id: "ideias-3",
        title: "Sem gamificacao ou reconhecimento",
        description: "Nao havia pontuacao, ranking ou qualquer incentivo para quem contribuia com ideias. Inovacao dependia apenas de boa vontade individual."
      }
    ]
  },
  {
    id: 14,
    name: "Governanca TI",
    sector: "Tecnologia",
    icon: "Settings",
    examples: [
      {
        id: "gov-1",
        title: "Demandas de TI por WhatsApp",
        description: "Solicitacoes de sistemas chegavam por WhatsApp, e-mail, corredor e ate bilhetes. Nao havia fila, priorizacao ou triagem formal."
      },
      {
        id: "gov-2",
        title: "Sem comite de priorizacao",
        description: "Cada diretor empurrava seu projeto como prioridade. TI fazia tudo ao mesmo tempo e nao entregava nada com qualidade."
      },
      {
        id: "gov-3",
        title: "Custo de TI desconhecido",
        description: "Ninguem sabia quanto a empresa gastava com TI por mes. Estimativas variavam entre R$80 mil e R$200 mil sem numero exato."
      }
    ]
  },
  {
    id: 15,
    name: "SOS Patrimonial",
    sector: "Seguranca Patrimonial",
    icon: "Shield",
    examples: [
      {
        id: "sos-1",
        title: "Ocorrencias reportadas por radio sem registro",
        description: "Acionamentos de seguranca eram feitos por radio. Sem registro escrito, era impossivel auditar quem acionou, quando e o desfecho."
      },
      {
        id: "sos-2",
        title: "Historico de ocorrencias inexistente",
        description: "Nao havia base historica de ocorrencias. Ao questionar 'qual local tem mais incidentes?', ninguem tinha a resposta."
      },
      {
        id: "sos-3",
        title: "Tempo de atendimento nao medido",
        description: "Nao se media o tempo entre o acionamento e o atendimento pela equipe. Sem metricas, nao havia como melhorar o servico."
      }
    ]
  },
  {
    id: 16,
    name: "Absenteismo",
    sector: "Recursos Humanos / Pessoas",
    icon: "UserX",
    examples: [
      {
        id: "abs-1",
        title: "Atestados medicos em pasta fisica",
        description: "Atestados medicos eram entregues em papel ao RH e guardados em pastas. Ninguem consolidava dados para identificar padroes de afastamento."
      },
      {
        id: "abs-2",
        title: "Dias perdidos calculados no final do ano",
        description: "O indicador de absenteismo so era calculado anualmente. Problemas criticos de saude ocupacional passavam meses sem deteccao."
      },
      {
        id: "abs-3",
        title: "Sem identificacao de causas recorrentes",
        description: "Sem sistema, era impossivel cruzar dados e perceber que uma area especifica tinha 3x mais afastamentos que as demais."
      }
    ]
  },
  {
    id: 17,
    name: "Exames Periodicos",
    sector: "Recursos Humanos / Pessoas",
    icon: "Stethoscope",
    examples: [
      {
        id: "exam-1",
        title: "Exames vencidos sem ninguem saber",
        description: "O controle de vencimento de exames era uma planilha que ninguem atualizava. Colaboradores trabalhavam meses com ASO vencido."
      },
      {
        id: "exam-2",
        title: "eSocial com dados incorretos",
        description: "Sem controle dos periodicos, os envios ao eSocial tinham dados defasados, gerando multas e notificacoes do governo."
      },
      {
        id: "exam-3",
        title: "Agendamento de exames por telefone",
        description: "O RH ligava para cada colaborador individualmente para agendar exames. Com 500+ colaboradores, o processo nunca ficava em dia."
      }
    ]
  },
  {
    id: 18,
    name: "Escala",
    sector: "Recursos Humanos / Pessoas",
    icon: "Calendar",
    examples: [
      {
        id: "escala-1",
        title: "Escala feita em quadro branco",
        description: "A escala de turnos era montada em um quadro branco na sala do supervisor. Qualquer alteracao exigia apagar e reescrever tudo."
      },
      {
        id: "escala-2",
        title: "Sobreposicao de horarios constante",
        description: "Sem sistema, era comum dois colaboradores serem escalados para o mesmo horario enquanto outro turno ficava descoberto."
      },
      {
        id: "escala-3",
        title: "Trocas de turno sem registro formal",
        description: "Trocas de turno eram combinadas verbalmente entre colegas. O supervisor so descobria na hora, quando o titular nao aparecia."
      }
    ]
  },
  {
    id: 19,
    name: "CIPIA",
    sector: "Administrativo / Juridico",
    icon: "Users",
    examples: [
      {
        id: "cipia-1",
        title: "Atas de reuniao em caderno",
        description: "As atas da CIPIA eram escritas a mao em um caderno. Acoes definidas ficavam registradas apenas ali, sem distribuicao aos responsaveis."
      },
      {
        id: "cipia-2",
        title: "Acoes sem prazo nem responsavel claro",
        description: "Cada reuniao gerava acoes vagas como 'melhorar processo X'. Sem prazo, responsavel ou acompanhamento, nada mudava."
      },
      {
        id: "cipia-3",
        title: "Sem alerta de atraso",
        description: "Ninguem cobrava acoes atrasadas porque ninguem sabia quais estavam atrasadas. O mesmo ponto voltava na reuniao seguinte meses depois."
      }
    ]
  },
  {
    id: 20,
    name: "Painel Terminais",
    sector: "Seguranca e Saude (QSSMA)",
    icon: "LayoutDashboard",
    examples: [
      {
        id: "pt-1",
        title: "Auditorias sem calendario definido",
        description: "Inspecoes nos terminais aconteciam de forma aleatoria, sem planejamento. Alguns pontos eram inspecionados todo mes, outros nunca."
      },
      {
        id: "pt-2",
        title: "Historico de anomalias em pastas separadas",
        description: "Cada auditor guardava seus relatorios em pastas pessoais. Consolidar o historico de um terminal exigia reunir informacoes de varias fontes."
      },
      {
        id: "pt-3",
        title: "Plano de acao sem follow-up",
        description: "Acoes corretivas eram definidas apos a inspecao mas nunca acompanhadas. O mesmo problema aparecia em todas as auditorias subsequentes."
      }
    ]
  },
  {
    id: 21,
    name: "Ocorrencias Pessoal",
    sector: "Recursos Humanos / Pessoas",
    icon: "AlertCircle",
    examples: [
      {
        id: "ocp-1",
        title: "Ocorrencias registradas em livro de ponto",
        description: "Faltas, atrasos e advertencias eram anotados em um livro de ponto fisico. Consultar o historico de um colaborador levava horas."
      },
      {
        id: "ocp-2",
        title: "Sem visao consolidada por area",
        description: "Cada supervisor controlava ocorrencias do seu time em cadernos diferentes. O RH nao tinha visao geral da empresa."
      },
      {
        id: "ocp-3",
        title: "Advertencias sem padronizacao",
        description: "Cada gestor aplicava criterios diferentes para advertencias. O mesmo comportamento gerava punicoes diferentes conforme a area."
      }
    ]
  },
  {
    id: 22,
    name: "OPA Acoes",
    sector: "Seguranca e Saude (QSSMA)",
    icon: "Target",
    examples: [
      {
        id: "opaa-1",
        title: "Acoes de OPA em planilha desatualizada",
        description: "As acoes geradas pelas observacoes preventivas eram registradas em Excel. A planilha ficava desatualizada em dias e ninguem cobrava."
      },
      {
        id: "opaa-2",
        title: "Sem piramide de gravidade para priorizacao",
        description: "Todas as ocorrencias eram tratadas com mesma urgencia. Condicoes inseguras graves esperavam na mesma fila que observacoes menores."
      },
      {
        id: "opaa-3",
        title: "Graficos de status feitos manualmente",
        description: "Relatorios de status das acoes OPA eram montados manualmente em PowerPoint uma vez por mes para a reuniao de diretoria."
      }
    ]
  },
  {
    id: 23,
    name: "Painel Treinamentos",
    sector: "Recursos Humanos / Pessoas",
    icon: "BookOpen",
    examples: [
      {
        id: "ptrein-1",
        title: "Controle de treinamentos em Excel gigante",
        description: "Uma planilha com 500+ linhas e dezenas de colunas tentava controlar todos os treinamentos. Travava, tinha formulas quebradas e versoes conflitantes."
      },
      {
        id: "ptrein-2",
        title: "Gestor nao sabia quem estava pendente",
        description: "Para saber quais colaboradores estavam com treinamentos pendentes, o gestor precisava ligar para o RH e esperar uma compilacao manual."
      },
      {
        id: "ptrein-3",
        title: "Historico de capacitacao incompleto",
        description: "Certificados e registros de treinamento se perdiam com a troca de gestores. Novos gestores nao tinham visao do que o time ja havia feito."
      }
    ]
  },
  {
    id: 24,
    name: "Abastecimento",
    sector: "Operacao Logistica",
    icon: "Fuel",
    examples: [
      {
        id: "abast-1",
        title: "Registro de litros em papel no campo",
        description: "O abastecedor anotava litros, locomotiva e horario em um caderno no patio. O papel molhava com chuva, borrava e ficava ilegivel."
      },
      {
        id: "abast-2",
        title: "Notas fiscais sem vinculacao ao abastecimento",
        description: "As notas fiscais do combustivel chegavam separadas dos registros de abastecimento. Conciliar os dois levava dias no financeiro."
      },
      {
        id: "abast-3",
        title: "Fotos de evidencia inexistentes",
        description: "Nao havia registro fotografico dos abastecimentos. Em caso de divergencia de volume, era palavra contra palavra."
      }
    ]
  },
  {
    id: 25,
    name: "Painel Abastecimento",
    sector: "Operacao Logistica",
    icon: "BarChart3",
    examples: [
      {
        id: "pabast-1",
        title: "Consumo de combustivel sem visibilidade",
        description: "Ninguem sabia o consumo total de combustivel por periodo ou por local. Os dados ficavam dispersos em cadernos de campo."
      },
      {
        id: "pabast-2",
        title: "Relatorio de areia e lubrificantes manual",
        description: "Quantidades de areia e lubrificantes eram consolidadas manualmente uma vez por mes. Desvios de consumo passavam despercebidos."
      },
      {
        id: "pabast-3",
        title: "Exportacao de dados impossivel",
        description: "Para gerar um relatorio de abastecimentos, era preciso digitar dados do caderno de campo para o Excel. Processo levava um dia inteiro."
      }
    ]
  },
  {
    id: 26,
    name: "Adm Treinamento",
    sector: "Recursos Humanos / Pessoas",
    icon: "Settings",
    examples: [
      {
        id: "admt-1",
        title: "Provas criadas e impressas manualmente",
        description: "Cada prova mensal era criada no Word, revisada, impressa em centenas de copias e distribuida. Um erro de digitacao exigia reimprimir tudo."
      },
      {
        id: "admt-2",
        title: "Certificados emitidos um a um",
        description: "Certificados de treinamento eram preenchidos manualmente em modelo Word, imprimidos e assinados. Com 500+ colaboradores, levava semanas."
      },
      {
        id: "admt-3",
        title: "Vencimentos de treinamento sem alerta",
        description: "Ninguem recebia aviso automatico de treinamentos proximos do vencimento. A renovacao dependia de alguem lembrar."
      }
    ]
  },
  {
    id: 27,
    name: "Seg. Registro Operacional",
    sector: "Seguranca Patrimonial",
    icon: "ClipboardList",
    examples: [
      {
        id: "segop-1",
        title: "Rondas sem comprovacao",
        description: "As rondas de seguranca eram registradas em livro de ocorrencias. Nao havia como provar se a ronda realmente foi feita ou nao."
      },
      {
        id: "segop-2",
        title: "Supervisor sem visibilidade das rondas",
        description: "O supervisor so sabia o que aconteceu nas rondas quando o vigilante entregava o livro no fim do turno. Problemas urgentes esperavam horas."
      },
      {
        id: "segop-3",
        title: "Dados de inspecao nao tabulados",
        description: "Observacoes das rondas ficavam em texto livre no livro. Impossivel gerar estatisticas ou identificar padroes de ocorrencias."
      }
    ]
  },
  {
    id: 28,
    name: "Seg. Saidas Materiais",
    sector: "Seguranca Patrimonial",
    icon: "Truck",
    examples: [
      {
        id: "segsm-1",
        title: "Controle de saida em caderno de portaria",
        description: "Saidas de materiais eram registradas a mao no caderno da portaria. Dados como placa, motorista e NF ficavam em caligrafia ilegivel."
      },
      {
        id: "segsm-2",
        title: "Sem vinculacao com nota fiscal",
        description: "O vigilante anotava a saida mas nao conferia a nota fiscal. Materiais saiam sem autorizacao formal e sem rastreabilidade."
      },
      {
        id: "segsm-3",
        title: "Auditorias encontravam furos constantes",
        description: "Em auditorias, o registro de saida nao batia com o estoque. Materiais sumiam e nao havia como investigar por falta de dados confiaveis."
      }
    ]
  },
  {
    id: 29,
    name: "Seg. Acesso Visitantes",
    sector: "Seguranca Patrimonial",
    icon: "UserCheck",
    examples: [
      {
        id: "segav-1",
        title: "Registro de visitantes em livro de portaria",
        description: "Visitantes registravam nome e horario a mao em um livro. A caligrafia era ilegivel e muitos campos ficavam em branco."
      },
      {
        id: "segav-2",
        title: "Sem controle de saida do visitante",
        description: "O visitante registrava a entrada mas ninguem verificava a saida. Era impossivel saber quantas pessoas externas estavam no site a qualquer momento."
      },
      {
        id: "segav-3",
        title: "Responsavel interno nao notificado",
        description: "O visitante chegava e o colaborador responsavel so era avisado por telefone - se o vigilante lembrasse. Visitantes esperavam na portaria por horas."
      }
    ]
  },
  {
    id: 30,
    name: "Seg. Registro Ocorrencias",
    sector: "Seguranca Patrimonial",
    icon: "FileWarning",
    examples: [
      {
        id: "segro-1",
        title: "Ocorrencias de vandalismo sem foto",
        description: "Incidentes como vandalismo e danos eram reportados apenas por texto no livro de ocorrencias. Sem foto, era dificil avaliar a gravidade."
      },
      {
        id: "segro-2",
        title: "Sem rastreabilidade de acoes tomadas",
        description: "Quando uma ocorrencia era registrada, ninguem anotava as acoes tomadas em resposta. O mesmo incidente se repetia sem providencias."
      },
      {
        id: "segro-3",
        title: "Dados de seguranca nao analisados",
        description: "Sem sistema digital, era impossivel gerar graficos de tendencias. A gestao de seguranca era reativa, nunca preventiva."
      }
    ]
  },
  {
    id: 31,
    name: "CCP - Trens na Porteira",
    sector: "Operacao Ferroviaria",
    icon: "Train",
    examples: [
      {
        id: "ccptp-1",
        title: "Previsao de chegada anotada em papel",
        description: "A previsao de chegada dos trens era anotada manualmente pelo CCP. Quando o trem chegava, ninguem comparava com a previsao original."
      },
      {
        id: "ccptp-2",
        title: "Desvios de horario nao rastreados",
        description: "A diferenca entre previsao e chegada real nunca era calculada. Era impossivel medir a pontualidade da operacao ferroviaria."
      },
      {
        id: "ccptp-3",
        title: "Exportacao de dados inexistente",
        description: "Dados de chegadas ficavam em cadernos. Gerar um relatorio para a diretoria exigia dias de digitacao e compilacao manual."
      }
    ]
  },
  {
    id: 32,
    name: "CCP - Formacao de Vazios",
    sector: "Operacao Ferroviaria",
    icon: "BoxSelect",
    examples: [
      {
        id: "ccpfv-1",
        title: "Alocacao de vagoes no 'achismo'",
        description: "A formacao de trens vazios era decidida no feeling do operador. Sem dados historicos, a alocacao de locomotivas e vagoes era ineficiente."
      },
      {
        id: "ccpfv-2",
        title: "Sem monitoramento em tempo real",
        description: "Ninguem sabia em tempo real quantos vagoes estavam formados, em trnsito ou aguardando. A informacao era atualizada uma vez por turno."
      },
      {
        id: "ccpfv-3",
        title: "Analise de desempenho impossivel",
        description: "Sem registros digitais, comparar a eficiencia entre turnos, equipes ou periodos era simplesmente impossivel."
      }
    ]
  },
  {
    id: 33,
    name: "CCP - Giro Locomotiva",
    sector: "Operacao Ferroviaria",
    icon: "RotateCw",
    examples: [
      {
        id: "ccpgl-1",
        title: "Tempo de giro nao medido",
        description: "O ciclo completo do trem (chegada > descarga > saida) nao era medido. Ninguem sabia se o giro levava 4 ou 12 horas."
      },
      {
        id: "ccpgl-2",
        title: "Motivos de atraso nao registrados",
        description: "Quando uma locomotiva ficava parada alem do previsto, ninguem registrava o motivo. Problemas sistemicos passavam despercebidos."
      },
      {
        id: "ccpgl-3",
        title: "Meta de giro sem comparativo real",
        description: "Existia uma meta de tempo de giro, mas sem medicao real, era apenas um numero no papel. Ninguem sabia se estava sendo cumprida."
      }
    ]
  },
  {
    id: 34,
    name: "CCP - Controle Operacionais",
    sector: "Operacao Ferroviaria",
    icon: "Gauge",
    examples: [
      {
        id: "ccpco-1",
        title: "Justificativas de atraso verbais",
        description: "Quando um trem chegava atrasado, a justificativa era dada verbalmente e esquecida. Sem registro, padroes de atraso nao eram identificados."
      },
      {
        id: "ccpco-2",
        title: "Historico operacional inexistente",
        description: "Nao havia historico para auditorias. Quando questionados sobre performance, operadores dependiam de memoria pessoal."
      },
      {
        id: "ccpco-3",
        title: "Previsao vs real nunca comparados",
        description: "Os horarios previstos e reais nunca eram confrontados sistematicamente. A operacao nao tinha feedback loop para melhorar."
      }
    ]
  },
  {
    id: 35,
    name: "CCP - Vagoes Recusados Hidrovias",
    sector: "Operacao Ferroviaria",
    icon: "Ban",
    examples: [
      {
        id: "ccpvr-1",
        title: "Vagoes recusados sem registro do motivo",
        description: "Quando um vagao era recusado pela Hidrovias, o motivo era comunicado por radio e perdido. Avarias recorrentes nao eram rastreadas."
      },
      {
        id: "ccpvr-2",
        title: "Sem filtro por tipo de avaria",
        description: "Impossivel saber se as recusas eram por bica, tampa, mecanica ou outro motivo. Acoes corretivas eram genericas e ineficazes."
      },
      {
        id: "ccpvr-3",
        title: "Disputas com Hidrovias sem evidencia",
        description: "Em casos de discordancia sobre a recusa de vagoes, nao havia registro que comprovasse a condicao do vagao no momento."
      }
    ]
  },
  {
    id: 36,
    name: "CCP - Restricoes e Anomalias",
    sector: "Operacao Ferroviaria",
    icon: "AlertOctagon",
    examples: [
      {
        id: "ccpra-1",
        title: "Anomalias ferroviarias sem registro formal",
        description: "Restricoes na via e anomalias eram comunicadas por radio e esquecidas no turno seguinte. A mesma anomalia surpreendia a equipe repetidamente."
      },
      {
        id: "ccpra-2",
        title: "Duracao do impacto nao registrada",
        description: "Ninguem registrava quanto tempo uma restricao impactou a circulacao. O custo operacional de anomalias era desconhecido."
      },
      {
        id: "ccpra-3",
        title: "Lider responsavel nao identificado",
        description: "Quando uma anomalia ocorria, nao ficava claro quem era o lider responsavel por resolve-la. A responsabilidade se diluia."
      }
    ]
  },
  {
    id: 37,
    name: "CCP - MRS Puxadas - Entregas",
    sector: "Operacao Ferroviaria",
    icon: "ArrowRightLeft",
    examples: [
      {
        id: "ccpmrs-1",
        title: "Fluxo de trens MRS sem visibilidade",
        description: "O controle de trens puxados pela MRS era feito por telefone. Nao havia registro sistematico de chegada, formacao e liberacao."
      },
      {
        id: "ccpmrs-2",
        title: "Tempo de ciclo desconhecido",
        description: "O tempo total desde a chegada do trem ate a entrega final nao era medido. Gargalos operacionais passavam anos sem serem identificados."
      },
      {
        id: "ccpmrs-3",
        title: "Dados de entregas nao consolidados",
        description: "Cada turno tinha seu proprio caderno de registros. Consolidar dados de uma semana exigia reunir informacoes de 6 cadernos diferentes."
      }
    ]
  },
  {
    id: 38,
    name: "PCZ - Painel Chegada",
    sector: "Operacao Ferroviaria",
    icon: "ArrowDownToLine",
    examples: [
      {
        id: "pczpc-1",
        title: "Chegadas em Conceicaozinha sem rastreamento",
        description: "A chegada de trens no Patio Conceicaozinha era anotada em quadro branco. Quando o turno trocava, o quadro era apagado."
      },
      {
        id: "pczpc-2",
        title: "Previsoes vindas apenas por telefone",
        description: "As previsoes de chegada vinham por telefone da MRS. O operador anotava em papel e frequentemente os numeros eram transcritos errados."
      },
      {
        id: "pczpc-3",
        title: "Sem tempo real para gestores remotos",
        description: "Gestores em escritorios remotos nao tinham acesso a informacao de chegadas. Dependiam de ligacoes telefonicas constantes."
      }
    ]
  },
  {
    id: 39,
    name: "PCZ - Painel Partida",
    sector: "Operacao Ferroviaria",
    icon: "ArrowUpFromLine",
    examples: [
      {
        id: "pczpp-1",
        title: "Saida de vazios sem programacao",
        description: "A saida de trens vazios era decidida ad hoc pelo lider de patio. Nao havia programacao sistematica nem otimizacao de recursos."
      },
      {
        id: "pczpp-2",
        title: "Alocacao de locomotivas no papel",
        description: "A distribuicao de locomotivas para formacao era feita em anotacoes de papel. Frequentemente, locomotivas ficavam ociosas por falta de visibilidade."
      },
      {
        id: "pczpp-3",
        title: "Tempo de permanencia sem controle",
        description: "Vagoes ficavam parados no patio por horas sem que ninguem registrasse ou justificasse o tempo de espera."
      }
    ]
  },
  {
    id: 40,
    name: "PCZ - Restricao e Anomalias",
    sector: "Operacao Ferroviaria",
    icon: "AlertOctagon",
    examples: [
      {
        id: "pczra-1",
        title: "Anomalias no PCZ sem historico",
        description: "Restricoes no Patio Conceicaozinha eram resolvidas sem registro. Meses depois, o mesmo problema reocorria e ninguem lembrava da solucao anterior."
      },
      {
        id: "pczra-2",
        title: "Impacto na circulacao nao quantificado",
        description: "Quando uma anomalia bloqueava uma linha, ninguem calculava quantos trens foram impactados e qual o custo operacional."
      },
      {
        id: "pczra-3",
        title: "Comunicacao entre turnos falha",
        description: "Informacoes sobre restricoes ativas nao eram passadas adequadamente entre turnos. O turno seguinte descobria problemas ao chegar."
      }
    ]
  },
  {
    id: 41,
    name: "PCZ - Giro Locomotiva",
    sector: "Operacao Ferroviaria",
    icon: "RotateCw",
    examples: [
      {
        id: "pczgl-1",
        title: "Ciclo da locomotiva nao cronometrado",
        description: "No PCZ, o tempo de giro da locomotiva nao era cronometrado. Cada turno estimava por 'sensacao' se a operacao estava rapida ou lenta."
      },
      {
        id: "pczgl-2",
        title: "Comparativo com meta inexistente",
        description: "Havia metas de giro definidas pela diretoria, mas sem medicao real, os numeros reportados eram estimativas do lider de turno."
      },
      {
        id: "pczgl-3",
        title: "Backlog de vagoes sem registro",
        description: "Vagoes aguardando descarga se acumulavam sem que ninguem registrasse a fila. O backlog so era percebido quando o patio lotava."
      }
    ]
  },
  {
    id: 42,
    name: "PCZ - Recusados Termag",
    sector: "Operacao Ferroviaria",
    icon: "XCircle",
    examples: [
      {
        id: "pczrt-1",
        title: "Vagoes recusados pelo Termag sem dados",
        description: "Vagoes recusados no Termag eram comunicados por radio. O motivo da recusa (avaria, mecanica, umidade) nunca era registrado formalmente."
      },
      {
        id: "pczrt-2",
        title: "Reincidencia de avarias nao detectada",
        description: "O mesmo vagao podia ser recusado varias vezes pelo mesmo motivo sem que ninguem percebesse o padrao. Manutencao preventiva era impossivel."
      },
      {
        id: "pczrt-3",
        title: "Responsavel pela recusa nao identificado",
        description: "Nao havia registro de qual colaborador fez a recusa nem quem era responsavel pela avaria. A responsabilidade se perdia."
      }
    ]
  },
  {
    id: 43,
    name: "Simulador PPR",
    sector: "Recursos Humanos / Pessoas",
    icon: "Calculator",
    examples: [
      {
        id: "ppr-1",
        title: "Calculo de PPR feito no RH sob demanda",
        description: "Cada colaborador que queria simular seu PPR precisava pedir ao RH. A equipe perdia horas fazendo calculos individuais em planilha."
      },
      {
        id: "ppr-2",
        title: "Formulas de calculo obscuras",
        description: "Ninguem entendia como o PPR era calculado. A falta de transparencia gerava desconfianca e reclamacoes constantes."
      },
      {
        id: "ppr-3",
        title: "Simulacoes com dados desatualizados",
        description: "Quando o RH fazia simulacoes, usava dados de meses anteriores. O colaborador recebia um valor diferente do simulado e perdia a confianca."
      }
    ]
  },
  {
    id: 44,
    name: "Painel QLP",
    sector: "Recursos Humanos / Pessoas",
    icon: "Network",
    examples: [
      {
        id: "qlp-1",
        title: "Organograma em PowerPoint desatualizado",
        description: "O quadro de lotacao era um arquivo PowerPoint atualizado trimestralmente. Sempre estava defasado em relacao a realidade."
      },
      {
        id: "qlp-2",
        title: "Hierarquia descentralizada em planilhas",
        description: "Cada area mantinha sua propria planilha de colaboradores. Consolidar a hierarquia da empresa exigia semanas de trabalho manual."
      },
      {
        id: "qlp-3",
        title: "Movimentacoes sem visibilidade",
        description: "Transferencias, promocoes e desligamentos nao eram refletidos em nenhum sistema centralizado. O organograma nunca estava correto."
      }
    ]
  }
];

export const sectors = [
  "Todos",
  "Operacao Ferroviaria",
  "Seguranca e Saude (QSSMA)",
  "Seguranca Patrimonial",
  "Recursos Humanos / Pessoas",
  "Administrativo / Juridico",
  "Tecnologia",
  "Operacao Logistica"
];
